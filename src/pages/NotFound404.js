import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound404.css";

function NotFound404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleGoHome = () => {
    navigate("/"); // 홈페이지로 돌아가기
  };

  return (
    <div className="notfound-container">
      <div className="notfound-title">페이지를 찾을 수 없습니다</div>
      <div className="notfound-message">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </div>
      <div className="notfound-buttons">
        <button className="notfound-button" onClick={handleGoBack}>
          이전 화면으로 돌아가기
        </button>
        <button className="notfound-button" onClick={handleGoHome}>
          홈페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default NotFound404;
