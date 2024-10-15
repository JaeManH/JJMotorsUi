import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer reduced-footer">
      <div className="footer-content">
        <div className="footer-item">
          <h3>Contact Us</h3>
          <div className="footer-item-content">
            <p>Email: boool213@naver.com</p>
            <p>Phone: +82 (10) 4169-6887</p>
          </div>
        </div>
        <div className="footer-item">
          <h3>Address</h3>
          <div className="footer-item-content">
            <p>경기도 용인시 기흥구 구성로</p>
            <p>64번길 29 204호</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; Copyright 2024 JJ MOTORS Trading Co.,Ltd All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
