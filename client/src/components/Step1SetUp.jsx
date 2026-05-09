import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaCheckCircle,
    FaLaptopCode,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [customRole, setCustomRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [workExperience, setWorkExperience] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const navigate = useNavigate();


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setWorkExperience(result.data.workExperience || []);
            setResumeText(result.data.resumeText || "");
            if (result.data.name) setCandidateName(result.data.name);
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setUploadError(error.response?.data?.message || "Failed to analyze resume. Please try again.");
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        const finalRole = role === "Other" ? customRole : role;
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role: finalRole, experience, mode , resumeText, projects, skills, candidateName } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           // Use the name from the resume if available, fall back to account name
           onStart({...result.data, userName: result.data.userName || candidateName || "Candidate" })

        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response?.data?.message?.includes("Not enough credits")) {
                setShowCreditPopup(true);
            }
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4'>

            <div className='w-full max-w-6xl bg-black rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800 grid md:grid-cols-2 overflow-hidden'>

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-black to-gray-900 p-12 flex flex-col justify-center border-r border-gray-800'>

                    <h2 className="text-4xl font-bold text-white mb-6">
                        Start Your AI Interview
                    </h2>

                    <p className="text-gray-400 mb-10">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-5'>

                        {
                            [
                                {
                                    icon: <FaUserTie className="text-green-400 text-xl" />,
                                    text: "Choose Role & Experience",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-green-400 text-xl" />,
                                    text: "Smart Voice Interview",
                                },
                                {
                                    icon: <FaChartLine className="text-green-400 text-xl" />,
                                    text: "Performance Analytics",
                                },
                            ].map((item, index) => (
                                <motion.div key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.03 }}
                                    className='flex items-center space-x-4 bg-gray-800/50 border border-gray-700 p-4 rounded-xl shadow-sm cursor-pointer hover:bg-gray-800 transition'>
                                    {item.icon}
                                    <span className='text-gray-200 font-medium'>{item.text}</span>

                                </motion.div>
                            ))
                        }
                    </div>



                </motion.div>



                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-12 bg-[#0a0a0a]">

                    <h2 className='text-3xl font-bold text-white mb-8'>
                        Interview SetUp
                    </h2>


                    <div className='space-y-6'>

                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-gray-500 pointer-events-none' />
                            <select
                                className='w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition appearance-none bg-gray-900 text-white'
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            >
                                <option value="" disabled>Select Job Role</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="UI/UX Designer">UI/UX Designer</option>
                                <option value="QA Engineer">QA Engineer</option>
                                <option value="Other">Other</option>
                                {role && ![
                                    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer",
                                    "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "Product Manager",
                                    "UI/UX Designer", "QA Engineer", "Other"
                                ].includes(role) && (
                                    <option value={role}>{role}</option>
                                )}
                            </select>
                        </div>

                        {role === "Other" && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='relative'>
                                <FaUserTie className='absolute top-4 left-4 text-gray-500 pointer-events-none' />
                                <input
                                    type='text'
                                    placeholder='Type your custom role'
                                    className='w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-gray-900 text-white placeholder-gray-500'
                                    onChange={(e) => setCustomRole(e.target.value)}
                                    value={customRole}
                                    autoFocus
                                />
                            </motion.div>
                        )}


                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-gray-500 pointer-events-none' />
                            <select
                                className='w-full pl-12 pr-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition appearance-none bg-gray-900 text-white'
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            >
                                <option value="" disabled>Select Experience</option>
                                <option value="0">0 Years (Fresher)</option>
                                <option value="1">1 Year</option>
                                <option value="2">2 Years</option>
                                <option value="3">3 Years</option>
                                <option value="4">4 Years</option>
                                <option value="5">5+ Years</option>
                                {experience && !["0", "1", "2", "3", "4", "5"].includes(experience) && (
                                    <option value={experience}>{experience}</option>
                                )}
                            </select>
                        </div>

                        <select value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3 px-4 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-gray-900 text-white'>

                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>

                        </select>

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-900/20 transition'>

                                <FaFileUpload className='text-4xl mx-auto text-green-500 mb-3' />

                                <input type="file"
                                    accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const allowedTypes = [
                                            'application/pdf',
                                            'application/msword',
                                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                        ];
                                        if (file && !allowedTypes.includes(file.type) && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
                                            setUploadError('Only PDF or Word documents are allowed.');
                                            e.target.value = '';
                                            return;
                                        }
                                        setUploadError('');
                                        setResumeFile(file);
                                    }} />

                                <p className='text-gray-400 font-medium'>
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}

                                        className='mt-4 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition border border-gray-600'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}



                                    </motion.button>)}

                            </motion.div>
                        )}

                        {uploadError && (
                            <p className="text-red-500 text-sm -mt-2 font-medium">{uploadError}</p>
                        )}

                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className='bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-sm space-y-6 relative overflow-hidden'>
                                
                                {/* Decorative background shape */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

                                <div className="flex items-center space-x-3 border-b border-gray-700 pb-4">
                                    <FaCheckCircle className="text-3xl text-green-400" />
                                    <div>
                                        <h3 className='text-2xl font-bold text-white'>Analysis Complete</h3>
                                        {candidateName && (
                                            <p className="text-green-400 text-sm font-medium mt-0.5">👤 {candidateName}</p>
                                        )}
                                    </div>
                                </div>

                                {workExperience.length > 0 && (
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <FaBriefcase className="text-green-400 text-lg" />
                                            <p className='font-bold text-white text-lg'>Work Experience</p>
                                        </div>
                                        <div className='space-y-3'>
                                            {workExperience.map((we, i) => (
                                                <div key={i} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                                                    <h4 className="font-bold text-white">{we.role}</h4>
                                                    <p className="text-sm text-green-400 font-medium">{we.company} • {we.duration}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {projects.length > 0 && (
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <FaLaptopCode className="text-green-400 text-lg" />
                                            <p className='font-bold text-white text-lg'>Projects</p>
                                        </div>
                                        <div className='grid grid-cols-1 gap-2'>
                                            {projects.map((p, i) => (
                                                <div key={i} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-lg text-gray-300 text-sm shadow-sm flex items-start space-x-2">
                                                    <span className="text-green-500 mt-0.5">•</span>
                                                    <span>{p}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {skills.length > 0 && (
                                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <FaChartLine className="text-green-400 text-lg" />
                                            <p className='font-bold text-white text-lg'>Skills</p>
                                        </div>
                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-green-500/20 text-green-400 border border-green-500/30 shadow-sm px-4 py-1.5 rounded-full text-sm font-medium tracking-wide'>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}


                        <motion.button
                        onClick={handleStart}
                            disabled={!role || (role === "Other" && !customRole.trim()) || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'>
                            {loading ? "Starting...":"Start Interview"}


                        </motion.button>
                    </div>

                </motion.div>
            </div>

            {/* Credit Popup */}
            {showCreditPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative">
                        <button 
                            onClick={() => setShowCreditPopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-white mb-2">Out of Credits</h3>
                        <p className="text-gray-400 mb-6">You need at least 50 credits to start an interview. Purchase more to continue practicing.</p>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setShowCreditPopup(false)}
                                className="flex-1 px-4 py-2 rounded-xl border border-gray-600 text-white hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => navigate('/pricing')}
                                className="flex-1 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
                            >
                                Buy Credits
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </motion.div>
    )
}

export default Step1SetUp
