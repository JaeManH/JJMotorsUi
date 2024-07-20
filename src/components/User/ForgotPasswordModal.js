import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ForgotPasswordModal = ({ show, handleClose, handleBack }) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (show) {
      emailInputRef.current.focus();
    }
  }, [show]);

  const handleSendEmail = (e) => {
    e.preventDefault();

    console.log("Password reset email sent to:", email);
    setEmailSent(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSendEmail}>
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
          </Form.Group>
          <Button variant="primary" type="submit">
            Send Password Reset Email
          </Button>
        </Form>
        {emailSent && (
          <div className="mt-3">
            <p>
              A password reset email has been sent to {email}. Please check your
              inbox.
            </p>
          </div>
        )}
        <Button variant="secondary" onClick={handleBack} className="mt-3">
          Back to Login
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
