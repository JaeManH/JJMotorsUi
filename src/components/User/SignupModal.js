import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignupModal = ({ show, handleClose, handleBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (show) {
      emailInputRef.current.focus();
    }
  }, [show]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!emailVerified) {
      alert("Please verify your email before signing up.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailSent(false);
    setEmailVerified(false);
    handleClose();
  };

  const sendVerificationEmail = () => {
    console.log("Verification email sent to:", email);
    setEmailSent(true);
    setEmailVerified(false);
  };

  const handleVerifyEmail = () => {
    console.log("Email verified:", email);
    setEmailVerified(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInputRef}
              autoComplete="off"
              required
            />
            <Button
              variant="secondary"
              onClick={sendVerificationEmail}
              className="mt-2"
            >
              Send Verification Email
            </Button>
            {emailSent && !emailVerified && (
              <Button
                variant="info"
                onClick={handleVerifyEmail}
                className="mt-2"
              >
                Verify Email
              </Button>
            )}
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
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!emailVerified}>
            Sign Up
          </Button>
        </Form>
        <Button variant="secondary" onClick={handleBack} className="mt-3">
          Back to Login
        </Button>
        {emailSent && !emailVerified && (
          <div className="mt-3">
            <p>
              A verification email has been sent to {email}. Please check your
              inbox and click the verification link.
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
