import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../../store/store";

const LoginModal = ({
  show,
  handleClose,
  handleSignupShow,
  handleForgotPasswordShow,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);

  let dispatch = useDispatch();
  let store = useSelector((state) => state);

  useEffect(() => {
    if (show) {
      emailInputRef.current.focus();
    }
  }, [show]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    if (email === "admin" && password === "admin") {
      console.log("Login !!");
      dispatch(login());
      dispatch(setUser({ name: "Test", email: email }));
      setEmail("");
      setPassword("");
      handleClose();
    } else {
      console.log("Login Fail");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="id"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInputRef}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div className="mt-3">
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
