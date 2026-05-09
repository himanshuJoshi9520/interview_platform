import express from "express";
import axios from "axios";

const router = express.Router();

// ElevenLabs voice IDs – free premade voices available on all tiers
const VOICE_IDS = {
  female: "hpp4J3VqNfWAUOO0d1Us", // Sarah – warm, natural female voice (free tier)
  male: "nPczCjzI2devNBz1zQrb",   // Brian – professional male voice (free tier)
};

router.post("/", async (req, res) => {
  const { text, gender = "female" } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required." });
  }

  const voiceId = VOICE_IDS[gender] || VOICE_IDS.female;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text.trim(),
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": response.data.byteLength,
      "Cache-Control": "no-cache",
    });

    res.send(Buffer.from(response.data));
  } catch (err) {
    console.error("ElevenLabs TTS error:", err?.response?.data || err.message);
    res.status(500).json({ error: "TTS generation failed." });
  }
});

export default router;
