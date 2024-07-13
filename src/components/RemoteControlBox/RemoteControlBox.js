import React from "react";
import { Button } from "react-bootstrap";
import "./RemoteControlBox.css"; // 새로운 스타일링 파일 임포트

const RemoteControlBox = ({ onContactClick, onPurchaseClick }) => {
  return (
    <div className="remote-control-box">
      <Button variant="info" className="remote-button" onClick={onContactClick}>
        문의 하기
      </Button>
      <Button
        variant="info"
        className="remote-button"
        onClick={onPurchaseClick}
      >
        구매 방법
      </Button>
    </div>
  );
};

export default RemoteControlBox;
