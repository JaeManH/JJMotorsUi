import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import React, { useState, useEffect } from "react";

function ChatBot() {
  let [showChatbot, setShowChatbot] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(false);
    }, 5000); // 5초 후에 메시지를 숨깁니다.

    return () => clearTimeout(timer);
  }, []);

  if (showChatbot) {
    return (
      <div className="chatbotContainer">
        <div className="chatbotBox">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            style={{ position: "fixed" }}
          />
          <button
            className="chatbotCloseButton"
            onClick={() => {
              setShowChatbot(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showInitialMessage && (
        <div className="chatbotInitialMessage">무엇을 도와드릴까요?</div>
      )}
      <div
        className="chatbotIcon"
        onClick={() => {
          setShowChatbot(true);
        }}
      >
        <img src="/help-desk.png" alt="chatbotIcon" />
      </div>
    </>
  );
}

export default ChatBot;
