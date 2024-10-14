import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./PurchaseModal.css"; // 새로운 스타일링 파일 임포트

const PurchaseModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Methods</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Here you can describe the different methods available for purchasing
          your products.
        </p>
        <ul>
          <li>Online Payment</li>
          <li>Bank Transfer</li>
          <li>Cash on Delivery</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
