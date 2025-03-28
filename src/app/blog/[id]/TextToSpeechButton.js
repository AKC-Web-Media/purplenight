"use client";
import React, { useState, useEffect } from "react";
import { RxSpeakerLoud } from "react-icons/rx";

const TextToSpeechButton = ({ blogContent }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSpeech = () => {
    if (!isClient || !window.speechSynthesis) {
      console.warn("Text-to-Speech is not supported on this device.");
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = blogContent || "No content available";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <button
      onClick={toggleSpeech}
      style={{
        background: "none",
        border: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        cursor: "pointer",
        marginTop: "5px",
        width: "40px",
        height: "40px",
        transition: "color 0.3s ease-in-out",
      }}
    >
      <RxSpeakerLoud />
    </button>
  );
};

export default TextToSpeechButton;
