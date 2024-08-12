import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const LoginModal = ({
  show,
  handleClose,
  handleSignupShow,
  handleForgotPasswordShow,
}) => {
  useEffect(() => {
    // Facebook SDK 초기화 등 필요한 초기화 코드 추가
  }, []);

  const handleLinkedInLogin = () => {
    // LinkedIn 로그인 로직 추가
    console.log("LinkedIn 로그인");
  };

  const handleGoogleLogin = () => {
    // Google 로그인 로직 추가
    console.log("Google 로그인");
  };

  const handleWeChatLogin = () => {
    // WeChat 로그인 로직 추가
    console.log("WeChat 로그인");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>

        <hr />

        <div className="mt-3">
          <Row className="mb-2">
            <Col xs={12} className="mb-2">
              <Button
                variant="light"
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={handleGoogleLogin}
                style={{
                  padding: "10px 0",
                  backgroundColor: "#fff",
                  borderColor: "#ddd",
                }}
              >
                <img
                  src="/images/web_light_sq_na@1x.png"
                  alt="Google"
                  style={{ height: "24px", marginRight: "8px" }}
                />
                <span style={{ fontSize: "16px", color: "#757575" }}>
                  Sign in with Google
                </span>
              </Button>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="pr-1">
              <Button
                variant="outline-primary"
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={() => {
                  // Facebook 로그인 처리
                  console.log("Facebook 로그인");
                }}
                style={{ padding: "10px 0" }}
              >
                <img
                  src="https://www.facebook.com/images/fb_icon_325x325.png"
                  alt="Facebook"
                  style={{ width: "20px", marginRight: "8px" }}
                />
                Facebook
              </Button>
            </Col>
            <Col xs={6} className="pl-1">
              <Button
                variant="outline-info"
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={handleLinkedInLogin}
                style={{ padding: "10px 0" }}
              >
                <img
                  src="/images/LI-Logo.png"
                  alt="LinkedIn Logo"
                  style={{ height: "20px", marginRight: "8px" }}
                />
                LinkedIn
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                variant="outline-success"
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={handleWeChatLogin}
                style={{ padding: "10px 0" }}
              >
                <img
                  src="/images/wechat_login_icon.png"
                  alt="WeChat"
                  style={{ width: "20px", marginRight: "8px" }}
                />
                WeChat
              </Button>
            </Col>
          </Row>
        </div>

        <div className="mt-3 text-center">
          <a
            href="#signup"
            onClick={() => {
              handleClose();
              handleSignupShow();
            }}
          >
            Sign Up
          </a>{" "}
          |{" "}
          <a
            href="#forgot-password"
            onClick={() => {
              handleClose();
              handleForgotPasswordShow();
            }}
          >
            Forgot Password
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
