import React, { useState } from "react";
import "./QnA.css";

const questionsAndAnswers = [
  {
    question: "배송 기간은 얼마나 걸리나요?",
    answer:
      "배송 기간은 주문차량에 따라 다르므로 자세한 내용은 영업부에 문의해주세요.",
  },
  {
    question: "어떤 종류의 거래 조건을 사용할 수 있습니까?",
    answer: "우리는 EXW,FCA,FOB,CFR,DAP,CIF,DDP로 거래할 수 있습니다.",
  },
  {
    question: "어떤 결제 조건을 수용할 수 있습니까?",
    answer:
      "L/C, D/P, O/A, 웨스턴 유니온, 페이팔, 머니그램, 안전 결제, 우리는 먼저 보증금을 지불하고 상품이 준비된 후 배송전에 전액 지불을 완료하는 것을 지원합니다.",
  },
  {
    question: "귀사에서 구매할 수 있는 차량 브랜드는 무엇이 있나요?",
    answer:
      "우리는 BYD, 폭스 바겐, 테슬라, 홍치, 우링 및 귀하가 원하는 다른 브랜드의 전기 자동차를 제공할 수 있습니다 원하시는 제품 무엇이든 모든 브랜드를 제공 할 수 있습니다!",
  },
  {
    question: "최소 주문량은 몇 대입니까?",
    answer: "1대부터 얼마든지 주문 가능합니다.",
  },
  {
    question: "제품에 대한 보증은 어떻게 되어있나요?",
    answer: `첫째
우리의 제품은 엄격한 품질관리 시스템에서 생산되었으며, 우리는 선적 전에 100 % 테스트를 통과했습니다 (기본 장비 테스트에는 도로, 등산, 비, 수로 등 포함). 경함률은 0.2 % 미만입니다.
둘째
우리는 최소 1년 동안 품질 보증을 제공하고 있으며, 전기 자동차에 부품 변경이 필요한 경우 무료로 서비스를 제공 해드리고 있습니다. 결함이 있는 배치 제품의 경우 수리하여 다시 보내드리거나 리콜을 포함한 해결책을 제공하고 있습니다.`,
  },
];

const QnA = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAnswer = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="qna-container">
      <h1 className="qna-title">QnA</h1>
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
