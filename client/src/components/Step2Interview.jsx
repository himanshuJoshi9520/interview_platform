import React from 'react'
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'
import * as faceapi from '@vladmandic/face-api';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, userName } = interviewData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const TAB_SWITCH_LIMIT = 3;
  const FACE_NOT_DETECTED_LIMIT = 5;

  // Proctoring states
  const [faceModelsLoaded, setFaceModelsLoaded] = useState(false);
  const [modelLoadError, setModelLoadError] = useState(false);
  const [cheatWarning, setCheatWarning] = useState("");
  const [warningMessage, setWarningMessage] = useState(""); // non-fatal face warning
  const [cameraWarning, setCameraWarning] = useState(""); // camera/black-frame warning
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [tabSwitchPopup, setTabSwitchPopup] = useState(null); // { count, isTerminal }
  const tabSwitchCountRef = useRef(0); // stable ref for event listener
  const tabSwitchLogRef = useRef([]); // [{ count, timestamp }]
  const [faceWarningPopup, setFaceWarningPopup] = useState(null); // { count, isTerminal }
  const faceNotDetectedCountRef = useRef(0); // total no-face warnings issued
  const referenceDescriptorRef = useRef(null);
  const faceIntervalRef = useRef(null);
  const faceWarningCountRef = useRef(0); // consecutive no-face detections
  const warningTimeoutRef = useRef(null); // auto-dismiss warning banner
  const cameraWarningTimeoutRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const isCheatingRef = useRef(false); // guard against duplicate triggers
  const isIntroPhaseRef = useRef(true); // stable ref for event listeners
  const finishInterviewRef = useRef(null); // will be set after finishInterview is defined
  const silenceTimeoutRef = useRef(null);

  const [questions, setQuestions] = useState(interviewData.questions || []);
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 50
  );
  const [isOverTime, setIsOverTime] = useState(false);
  const [overTimeSeconds, setOverTimeSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender] = useState("female"); // female avatar video
  const [subtitle, setSubtitle] = useState("");
  const audioCtxRef = useRef(null); // Web Audio API context
  const currentAudioSourceRef = useRef(null); // currently playing source node


  const videoRef = useRef(null);
  const userVideoRef = useRef(null);
  const streamRef = useRef(null);
  const cameraHealthIntervalRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  // Utility: detect black/blank frame via canvas pixel sampling
  const isBlackFrame = (videoEl) => {
    try {
      if (videoEl.readyState < 2 || videoEl.videoWidth === 0) return true;
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoEl, 0, 0, 64, 64);
      const { data } = ctx.getImageData(0, 0, 64, 64);
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        total += data[i] + data[i + 1] + data[i + 2];
      }
      const avg = total / (data.length / 4 * 3);
      return avg < 10; // near-black threshold
    } catch {
      return false;
    }
  };

  const showCameraWarning = (msg) => {
    console.warn(msg);
    setCameraWarning(msg);
    if (cameraWarningTimeoutRef.current) clearTimeout(cameraWarningTimeoutRef.current);
    cameraWarningTimeoutRef.current = setTimeout(() => setCameraWarning(""), 6000);
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        console.log('Face detection models loaded successfully.');
        setFaceModelsLoaded(true);
      } catch (err) {
        console.error('Face API models failed to load:', err);
        setModelLoadError(true);
      }
    };
    loadModels();
  }, []);

  const handleCheating = (reason, allowDuringIntro = false) => {
    // Prevent duplicate triggers
    if (isCheatingRef.current) return;
    // Don't fire during intro phase unless explicitly allowed
    if (!allowDuringIntro && isIntroPhaseRef.current) return;
    isCheatingRef.current = true;

    setCheatWarning(reason);
    clearInterval(faceIntervalRef.current);

    // Stop speech recognition immediately
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current.abort();
    }
    
    // Stop recording immediately
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // INSTANTLY shut down camera to turn off the hardware light
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }

    // Small delay so the alert doesn't block finish
    setTimeout(() => {
      alert(`⚠️ Interview Terminated:\n${reason}`);
      if (finishInterviewRef.current) {
        finishInterviewRef.current();
      }
    }, 200);
  };

  // Tab switch detection with 3-strike warning system
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return;
      if (isCheatingRef.current) return;

      tabSwitchCountRef.current += 1;
      const count = tabSwitchCountRef.current;
      const entry = { count, timestamp: new Date().toISOString() };
      tabSwitchLogRef.current.push(entry);
      console.warn(`Tab switch #${count} detected at ${entry.timestamp}`);

      setTabSwitchCount(count);

      if (count <= TAB_SWITCH_LIMIT) {
        setTabSwitchPopup({ count, isTerminal: false });
      } else {
        setTabSwitchPopup({ count, isTerminal: true });
        // Give the popup a moment to render before terminating
        setTimeout(() => {
          handleCheating('Interview terminated due to repeated tab switching violations.', true);
        }, 1500);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []); // always active once mounted

  // Helper to show a dismissible amber warning (non-fatal)
  const showFaceWarning = (msg) => {
    setWarningMessage(msg);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    warningTimeoutRef.current = setTimeout(() => setWarningMessage(""), 5000);
  };

  // Face detection — only starts after intro, uses stable ref
  useEffect(() => {
    if (!faceModelsLoaded) return;

    console.log('Face detection loop started.');

    faceIntervalRef.current = setInterval(async () => {
      // Skip if already cheating
      if (isCheatingRef.current) return;

      const video = userVideoRef.current;
      if (!video || video.ended || !streamRef.current) return;

      // --- Black / invalid frame check (runs even during intro) ---
      if (isBlackFrame(video)) {
        console.warn('Black frame detected — camera feed may be blocked or unavailable.');
        showCameraWarning('⚠️ Camera feed is not valid or blocked. Please check your camera.');
        return;
      }

      // Skip face detection logic during intro phase
      if (isIntroPhaseRef.current) return;

      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        if (detections.length === 0) {
          console.log('No face detected.');
          faceWarningCountRef.current += 1;  // consecutive miss counter (resets on face found)
          faceNotDetectedCountRef.current += 1; // total warnings issued (never resets)
          const totalWarnings = faceNotDetectedCountRef.current;

          if (totalWarnings <= FACE_NOT_DETECTED_LIMIT) {
            // Show a dismissible popup warning (like tab-switch system)
            setFaceWarningPopup({ count: totalWarnings, isTerminal: false });
          } else {
            // Exceeded limit → terminate
            setFaceWarningPopup({ count: totalWarnings, isTerminal: true });
            setWarningMessage("");
            setTimeout(() => {
              handleCheating(`Face not detected ${FACE_NOT_DETECTED_LIMIT} times. Interview terminated.`);
            }, 1500);
          }
        } else if (detections.length > 1) {
          console.log(`Multiple faces detected: ${detections.length}`);
          handleCheating('Multiple faces detected. Only the candidate should be visible.');
        } else {
          console.log('Face detected.');
          // Face detected — reset warning counter
          if (faceWarningCountRef.current > 0) {
            faceWarningCountRef.current = 0;
            setWarningMessage("");
          }
          const currentDescriptor = detections[0].descriptor;
          if (!referenceDescriptorRef.current) {
            referenceDescriptorRef.current = currentDescriptor;
            console.log('Reference face descriptor captured.');
          } else {
            const distance = faceapi.euclideanDistance(referenceDescriptorRef.current, currentDescriptor);
            if (distance > 0.65) {
              console.warn(`Identity mismatch — distance: ${distance.toFixed(3)}`);
              handleCheating('Different face detected. Identity verification failed.');
            }
          }
        }
      } catch (err) {
        console.error('Face detection frame error:', err);
      }
    }, 1000); // check every 1 second

    return () => {
      if (faceIntervalRef.current) clearInterval(faceIntervalRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (cameraWarningTimeoutRef.current) clearTimeout(cameraWarningTimeoutRef.current);
      if (cameraHealthIntervalRef.current) clearInterval(cameraHealthIntervalRef.current);
    };
  }, [faceModelsLoaded]);

  // ElevenLabs TTS — replaces Web Speech API
  const speakText = (text) => {
    return new Promise(async (resolve) => {
      if (!text || !text.trim()) { resolve(); return; }

      // Stop any currently playing audio
      if (currentAudioSourceRef.current) {
        try { currentAudioSourceRef.current.stop(); } catch {}
        currentAudioSourceRef.current = null;
      }

      setSubtitle(text);
      setIsAIPlaying(true);
      stopMic();
      videoRef.current?.play();

      try {
        const response = await fetch(ServerUrl + "/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, gender: "female" }),
          credentials: "include",
        });

        if (!response.ok) throw new Error("TTS request failed");

        const arrayBuffer = await response.arrayBuffer();

        // Lazily create AudioContext
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const audioCtx = audioCtxRef.current;
        if (audioCtx.state === "suspended") await audioCtx.resume();

        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        currentAudioSourceRef.current = source;

        source.onended = () => {
          currentAudioSourceRef.current = null;
          videoRef.current?.pause();
          if (videoRef.current) videoRef.current.currentTime = 0;
          setIsAIPlaying(false);
          if (isMicOn) startMic();
          setTimeout(() => { setSubtitle(""); resolve(); }, 300);
        };

        source.start(0);
      } catch (err) {
        console.error("ElevenLabs TTS playback error:", err);
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
        setIsAIPlaying(false);
        setSubtitle("");
        if (isMicOn) startMic();
        resolve();
      }
    });
  };


  // Trigger intro as soon as component mounts (ElevenLabs doesn't need voice pre-loading)
  const introStartedRef = useRef(false);
  useEffect(() => {
    if (introStartedRef.current) return;
    introStartedRef.current = true;

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false);
        isIntroPhaseRef.current = false;
      }
    };
    runIntro();
  }, []);

  // Speak each new question when currentIndex changes (after intro)
  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    const speakQuestion = async () => {
      await new Promise(r => setTimeout(r, 800));
      await speakText(currentQuestion.question);
      if (isMicOn) startMic();
    };
    speakQuestion();
  }, [currentIndex]);


  useEffect(() => {
    // We only care about silence when it's not the intro, the AI isn't speaking, and we aren't already submitting
    if (isIntroPhase || isAIPlaying || isSubmitting) {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      return;
    }

    // Start a 30-second silence timer
    silenceTimeoutRef.current = setTimeout(() => {
      console.log("30 seconds of silence detected. Auto-submitting/skipping question.");
      
      // If the candidate didn't say anything at all, mark it as skipped
      if (answer.trim() === "") {
        submitAnswer(true); 
      } else {
        // If they gave a partial answer but paused for 30 seconds, auto-submit it
        submitAnswer(false);
      }
    }, 30000);

    return () => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    };
  }, [answer, isIntroPhase, isAIPlaying, isSubmitting, currentIndex]);


  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    // Reset overtime state for new question
    setIsOverTime(false);
    setOverTimeSeconds(0);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch to overtime — don't force-submit
          setIsOverTime(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);

  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 50);
      setIsOverTime(false);
      setOverTimeSeconds(0);
    }
  }, [currentIndex]);


  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };


  const submitAnswer = async (isSkippedArg = false) => {
    const isSkipped = isSkippedArg === true;
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer: isSkipped ? "" : answer,
        isSkipped,
        timeTaken:
          currentQuestion.timeLimit - timeLeft,
      } , {withCredentials:true})

      setFeedback(result.data.feedback);
      
      if (result.data.nextQuestion) {
        setQuestions(prev => {
          const newQs = [...prev];
          // avoid duplicates if same index
          if (newQs.length === currentIndex + 1) {
             newQs.push(result.data.nextQuestion);
          }
          return newQs;
        });
      }

      if (result.data.isFinished) {
         // wait for feedback speech, then finish
         await speakText(result.data.feedback);
         await speakText("Thank you for your time. The interview is now complete.");
         finishInterview();
         return;
      } else {
         await speakText(result.data.feedback);

         // Auto-advance to next question (whether skipped or answered normally)
         setAnswer("");
         setFeedback("");
         await speakText("Let's move to the next question.");
         setCurrentIndex(prev => prev + 1);
         setTimeout(() => {
           if (isMicOn) startMic();
         }, 500);
      }
      
      setIsSubmitting(false)
    } catch (error) {
console.log(error)
setIsSubmitting(false)
    }
  }

  const handleNext =async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
       // shouldn't happen unless AI failed to generate next question but didn't set isFinished
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);

   
  }

  const finishInterview = async () => {
    stopMic()
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setIsMicOn(false)

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Shut down camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }

    try {
      const result = await axios.post(ServerUrl+ "/api/interview/finish" , { interviewId} , {withCredentials:true})

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Wire to ref so handleCheating (which has no closure over finishInterview) can call it
  finishInterviewRef.current = finishInterview;


  // Overtime counter: counts up every second once the recommended time is exceeded.
  useEffect(() => {
    if (!isOverTime || isIntroPhase || isSubmitting) return;

    const overtimeInterval = setInterval(() => {
      setOverTimeSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(overtimeInterval);
  }, [isOverTime, isIntroPhase, isSubmitting]);

  useEffect(() => {
    // Start Candidate Webcam
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log('Camera stream started.');
        streamRef.current = stream;
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          await userVideoRef.current.play().catch(() => {});
        }

        // Continuous camera health check — independent of face detection
        cameraHealthIntervalRef.current = setInterval(() => {
          const video = userVideoRef.current;
          if (!video || !streamRef.current) return;
          const tracks = streamRef.current.getVideoTracks();
          if (!tracks.length || tracks[0].readyState === 'ended') {
            console.warn('Camera track ended.');
            showCameraWarning('⚠️ Camera not detected or not working. Please enable your camera.');
            return;
          }
          if (isBlackFrame(video)) {
            console.warn('Black frame detected — camera feed may be blocked or unavailable.');
            showCameraWarning('⚠️ Camera feed is not valid or blocked. Please check your camera.');
          }
        }, 2000);

        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };
        mediaRecorder.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const formData = new FormData();
          formData.append('video', blob, `interview-${interviewId}.webm`);
          formData.append('interviewId', interviewId);

          try {
             await axios.post(ServerUrl + "/api/interview/upload-video", formData, { 
               withCredentials: true, 
               headers: { 'Content-Type': 'multipart/form-data' } 
             });
          } catch(e) {
             console.error("Error uploading video", e);
          }
        };
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;

      } catch (err) {
        console.error('Error accessing webcam:', err);
        showCameraWarning('⚠️ Camera not detected or not working. Please enable your camera.');
      }
    };
    enableCamera();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      // Stop Camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (cameraHealthIntervalRef.current) clearInterval(cameraHealthIntervalRef.current);

      window.speechSynthesis?.cancel();
      // Close Web Audio context
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans'>
      <div className='w-full max-w-6xl min-h-[85vh] bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-slate-700/50 flex flex-col lg:flex-row overflow-hidden relative'>
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Model Load Error Banner */}
        {modelLoadError && (
          <div className="absolute top-0 left-0 right-0 z-50 bg-red-700 text-white text-center py-3 px-6 font-bold text-sm flex items-center justify-center gap-2">
            <span>⚠️ Face detection models failed to load. Proctoring is unavailable.</span>
          </div>
        )}

        {/* Camera Warning Banner */}
        {cameraWarning && !cheatWarning && (
          <div className="absolute top-0 left-0 right-0 z-50 bg-orange-600 text-white text-center py-3 px-6 font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
            <span>{cameraWarning}</span>
            <button onClick={() => setCameraWarning("")} className="ml-4 text-white/70 hover:text-white text-lg font-bold leading-none">✕</button>
          </div>
        )}

        {/* Non-fatal Face Warning Banner */}
        {warningMessage && !cheatWarning && !cameraWarning && (
          <div className="absolute top-0 left-0 right-0 z-50 bg-amber-500 text-slate-900 text-center py-3 px-6 font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
            <span>{warningMessage}</span>
            <button
              onClick={() => setWarningMessage("")}
              className="ml-4 text-slate-900/60 hover:text-slate-900 text-lg font-bold leading-none"
            >✕</button>
          </div>
        )}

        {/* Anti-Cheat Warning Banner */}
        {cheatWarning && (
          <div className="absolute top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-3 px-6 font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
            <span>⚠️</span>
            <span>CHEATING DETECTED: {cheatWarning} — Interview is ending...</span>
          </div>
        )}

        {/* Tab Switch Popup Modal */}
        {tabSwitchPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl border p-8 flex flex-col items-center gap-4 ${
              tabSwitchPopup.isTerminal
                ? 'bg-red-950 border-red-500/60'
                : 'bg-slate-800 border-amber-500/60'
            }`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${
                tabSwitchPopup.isTerminal ? 'bg-red-500/20' : 'bg-amber-500/20'
              }`}>
                {tabSwitchPopup.isTerminal ? '🚫' : '⚠️'}
              </div>

              <h3 className={`text-xl font-bold text-center ${
                tabSwitchPopup.isTerminal ? 'text-red-300' : 'text-amber-300'
              }`}>
                {tabSwitchPopup.isTerminal
                  ? 'Interview Terminated'
                  : 'Tab Switch Detected'}
              </h3>

              <p className="text-slate-300 text-center text-sm leading-relaxed">
                {tabSwitchPopup.isTerminal
                  ? 'Interview terminated due to repeated tab switching violations.'
                  : 'Warning: Tab switching is not allowed during the interview.'}
              </p>

              {!tabSwitchPopup.isTerminal && (
                <div className="flex items-center gap-2 bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Violations</span>
                  <div className="flex gap-1">
                    {Array.from({ length: TAB_SWITCH_LIMIT }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < tabSwitchPopup.count ? 'bg-amber-400' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-amber-400 text-xs font-bold">{tabSwitchPopup.count}/{TAB_SWITCH_LIMIT}</span>
                </div>
              )}

              {!tabSwitchPopup.isTerminal && (
                <button
                  onClick={() => setTabSwitchPopup(null)}
                  className="mt-2 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition-colors"
                >
                  I Understand — Return to Interview
                </button>
              )}
            </div>
          </div>
        )}

        {/* Face Not Detected Popup Modal */}
        {faceWarningPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl border p-8 flex flex-col items-center gap-4 ${
              faceWarningPopup.isTerminal
                ? 'bg-red-950 border-red-500/60'
                : 'bg-slate-800 border-orange-500/60'
            }`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${
                faceWarningPopup.isTerminal ? 'bg-red-500/20' : 'bg-orange-500/20'
              }`}>
                {faceWarningPopup.isTerminal ? '🚫' : '👤'}
              </div>

              <h3 className={`text-xl font-bold text-center ${
                faceWarningPopup.isTerminal ? 'text-red-300' : 'text-orange-300'
              }`}>
                {faceWarningPopup.isTerminal
                  ? 'Interview Terminated'
                  : 'Face Not Detected'}
              </h3>

              <p className="text-slate-300 text-center text-sm leading-relaxed">
                {faceWarningPopup.isTerminal
                  ? `Your face was not detected ${FACE_NOT_DETECTED_LIMIT} times. The interview has been terminated.`
                  : 'Your face is not visible in the camera. Please ensure your face is clearly in frame.'}
              </p>

              {!faceWarningPopup.isTerminal && (
                <div className="flex items-center gap-2 bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Warnings</span>
                  <div className="flex gap-1">
                    {Array.from({ length: FACE_NOT_DETECTED_LIMIT }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < faceWarningPopup.count ? 'bg-orange-400' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-orange-400 text-xs font-bold">{faceWarningPopup.count}/{FACE_NOT_DETECTED_LIMIT}</span>
                </div>
              )}

              {!faceWarningPopup.isTerminal && (
                <button
                  onClick={() => setFaceWarningPopup(null)}
                  className="mt-2 w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  I Understand — Return to Frame
                </button>
              )}
            </div>
          </div>
        )}

        {/* Video & Info Sidebar */}
        <div className='w-full lg:w-[35%] bg-slate-800/50 flex flex-col items-center p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-700/50 z-10'>
          
          <div className='w-full max-w-sm rounded-[1.5rem] overflow-hidden shadow-2xl relative group bg-black'>
            <video
              src={femaleVideo}
              key="female-ai"
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto aspect-[4/3] object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
            {isAIPlaying && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Speaking
              </div>
            )}
             <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-sm font-medium border border-white/10">
               AI Interviewer
             </div>
          </div>

          {/* Subtitle / Speech Bubble */}
          <div className={`w-full max-w-sm transition-all duration-300 ${subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className='bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 shadow-lg relative'>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-700/50 border-t border-l border-slate-600/50 transform rotate-45"></div>
              <p className='text-slate-200 text-sm sm:text-base font-medium text-center leading-relaxed relative z-10'>"{subtitle || "..."}"</p>
            </div>
          </div>

          {/* Status & Timer Panel */}
          <div className='w-full max-w-sm bg-slate-800/80 border border-slate-700/50 rounded-2xl shadow-xl p-6 space-y-5 flex-1'>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-medium text-slate-400 uppercase tracking-wider'>
                Session Status
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isAIPlaying ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                {isAIPlaying ? "Active" : "Listening"}
              </span>
            </div>

            <div className="h-px bg-slate-700/50"></div>

            <div className='flex justify-center flex-col items-center gap-1'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} isOverTime={isOverTime} overTimeSeconds={overTimeSeconds} />
              {isOverTime && !isSubmitting && (
                <span className="text-xs font-semibold text-rose-400 animate-pulse mt-1">Wrap up &amp; submit</span>
              )}
            </div>

            <div className="h-px bg-slate-700/50"></div>

            <div className='flex flex-col items-center justify-center text-center space-y-1'>
                <span className='text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
                  {currentIndex + 1}
                </span>
                <span className='text-xs font-medium text-slate-400 uppercase tracking-widest'>Question</span>
            </div>
          </div>
        </div>

        {/* Main Interaction Section */}
        <div className='flex-1 flex flex-col p-6 sm:p-8 md:p-10 relative z-10 lg:pl-12'>
          <div className="flex justify-between items-center mb-8">
            <h2 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              {userName}'s Interview
            </h2>
            <div className="flex items-center gap-3">
              {/* Tab switch violation counter badge */}
              {tabSwitchCount > 0 && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                  tabSwitchCount >= TAB_SWITCH_LIMIT
                    ? 'bg-red-500/20 border-red-500/40 text-red-400'
                    : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                }`}>
                  <span>⚠️</span>
                  <span>{tabSwitchCount}/{TAB_SWITCH_LIMIT} tab switches</span>
                </div>
              )}
              <button
                onClick={finishInterview}
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-slate-600 hover:bg-rose-500/20 hover:border-rose-500/50 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm"
              >
                End Interview Early
              </button>
            </div>
          </div>

          {!isIntroPhase && (
          <div className='relative mb-8 bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-700/50 shadow-xl'>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                 <span className="text-emerald-400 font-bold text-sm">Q{currentIndex + 1}</span>
               </div>
               <p className='text-sm font-medium text-slate-400 uppercase tracking-wider'>
                 Evaluating Fit
               </p>
            </div>
            <div className='text-lg sm:text-xl font-semibold text-slate-200 leading-relaxed font-sans'>{currentQuestion?.question}</div>
          </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 mb-6 flex-1 min-h-0">
             {/* Candidate Webcam View */}
             <div className="w-full lg:w-1/3 rounded-3xl overflow-hidden border border-slate-700/50 shadow-xl relative bg-black flex-shrink-0 order-2 lg:order-1 lg:max-h-64 h-48 lg:h-auto">
               <video
                 ref={userVideoRef}
                 autoPlay
                 playsInline
                 muted
                 className="w-full h-full object-cover transform scale-x-[-1] opacity-90"
               />
               
               <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none"></div>

               {isMicOn && !isSubmitting && !isIntroPhase && !feedback && (
                  <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/30 backdrop-blur-sm border border-emerald-500/40 animate-pulse">
                     <FaMicrophone className="text-emerald-300" size={14} />
                  </div>
               )}

               <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                 You
                 {!isMicOn && <FaMicrophoneSlash className="text-rose-400" size={14} />}
               </div>
             </div>

             {/* Answer Textarea */}
             <div className="flex-1 flex flex-col relative order-1 lg:order-2 h-64 lg:h-auto">
                <textarea
                  placeholder="Your answer will appear here as you speak..."
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  readOnly={!isMicOn || isSubmitting || !!feedback}
                  className="w-full h-full bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl resize-none outline-none border border-slate-700/50 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-slate-200 text-lg sm:text-xl font-medium placeholder-slate-500 shadow-inner group custom-scrollbar"
                />
             </div>
          </div>

         {/* Actions */}
         {!feedback ? ( 
          <div className='flex items-center gap-4 mt-auto'>
            <motion.button
              onClick={toggleMic}
              whileTap={{ scale: 0.9 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center rounded-2xl shadow-xl transition-colors duration-300 border ${isMicOn ? 'bg-slate-700 border-slate-600 text-emerald-400 hover:bg-slate-600' : 'bg-rose-500/20 border-rose-500/30 text-rose-400 hover:bg-rose-500/30'}`}>
              {isMicOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24}/>}
            </motion.button>

            <motion.button
              onClick={() => submitAnswer(false)}
              disabled={isSubmitting || !answer.trim() || isIntroPhase}
              whileTap={{ scale: 0.95 }}
              className='flex-[2] shrink-0 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 sm:py-5 rounded-2xl shadow-lg shadow-emerald-900/40 hover:opacity-90 hover:shadow-emerald-900/60 transition-all font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/30 whitespace-nowrap overflow-hidden text-ellipsis px-2'>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>
                  Analyzing...
                </span>
              ) : "Submit Answer"}
            </motion.button>
          </div>
         ) : (
            <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className='mt-auto bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl overflow-hidden'>
              
              <div className="p-6 sm:p-8">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                     <span className="text-teal-400 font-bold text-sm">!</span>
                   </div>
                   <h3 className="text-lg font-bold text-slate-200">AI Feedback</h3>
                 </div>
                 <p className='text-slate-300 font-medium leading-relaxed text-lg'>{feedback}</p>
              </div>

              {(currentIndex + 1 < questions.length) && (
                <div className="bg-slate-900/50 p-4 sm:p-6 border-t border-slate-700/50 flex items-center justify-center gap-2 text-slate-400 text-sm">
                  <span className="w-4 h-4 border-2 border-slate-500/50 border-t-emerald-400 rounded-full animate-spin"></span>
                  Moving to next question...
                </div>
              )}

            </motion.div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Step2Interview
