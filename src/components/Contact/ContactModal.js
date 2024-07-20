import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ContactModal.css"; // 새로운 스타일링 파일 임포트

const ContactModal = ({ show, handleClose, user }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (show && user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [show, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 문의하기 제출 로직 추가
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Product:", product);
    console.log("Message:", message);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={user}
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={user}
            />
          </Form.Group>

          <Form.Group controlId="formProduct">
            <Form.Label>Product</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
