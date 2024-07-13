import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer reduced-footer">
      <div className="footer-content">
        <div className="footer-item">
          <h3>Contact Us</h3>
          <div className="footer-item-content">
            <p>Email: info@example.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-item">
          <h3>Address</h3>
          <div className="footer-item-content">
            <p>1234 Main St.</p>
            <p>City, State, 56789</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
