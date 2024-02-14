import fs from "fs";
import { SpeechClient } from "@google-cloud/speech";

export async function transcribeAudio(audioFilePath) {
  const speechClient = new SpeechClient();
  const audio = {
    content: fs.readFileSync(audioFilePath).toString("base64"),
  };

  const config = {
    encoding: "MP3",
    languageCode: "en-US",
  };

  const [response] = await speechClient.recognize({
    audio: audio,
    config: config,
  });

  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");

  console.log("Transcription:", transcription);
}
