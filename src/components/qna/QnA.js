import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./QnA.css";

const QnA = () => {
  const { t } = useTranslation();
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAnswer = (index) => {
    setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const questionsAndAnswers = t("qna.questionsAndAnswers", { returnObjects: true });

  return (
      <div className="qna-container">
        <h1 className="qna-title">{t("qna.title")}</h1>
        {questionsAndAnswers.map((qa, index) => (
            <div key={index} className="qna-item">
              <div className="qna-question" onClick={() => toggleAnswer(index)}>
                {qa.question}
              </div>
              {openIndices.includes(index) && (
                  <div className="qna-answer">
                    {qa.answer.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                  </div>
              )}
            </div>
        ))}
      </div>
  );
};

export default QnA;
