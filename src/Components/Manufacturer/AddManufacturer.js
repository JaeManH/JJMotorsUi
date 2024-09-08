import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddManufacturer = () => {
  const [manufacturerName, setManufacturerName] = useState("");
  const [country, setCountry] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const navigate = useNavigate();

  const handleAddManufacturer = async () => {
    const newManufacturer = {
      manufacturerName,
      country,
      logoUrl,
      createdBy: "admin", // This should be dynamic
      createdDate: new Date().toISOString(),
      updatedBy: "admin", // This should also be dynamic
      updatedDate: new Date().toISOString(),
    };

    try {
      await axios.post(
        "http://localhost:8080/api/manufacturers",
        newManufacturer
      );
      navigate("/"); // Add Manufacturer 후 리스트 페이지로 이동
    } catch (error) {
      console.error("제조사 추가 중 오류 발생:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">제조사 추가</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formManufacturerName">
          <Form.Label column sm={2}>
            제조사 이름
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="제조사 이름"
              value={manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formCountry">
          <Form.Label column sm={2}>
            국가
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="국가"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formLogoUrl">
          <Form.Label column sm={2}>
            로고 URL
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="로고 URL"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="primary" onClick={handleAddManufacturer}>
              제조사 추가
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddManufacturer;
