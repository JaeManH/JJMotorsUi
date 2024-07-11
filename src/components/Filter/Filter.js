import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Filter.css"; // 추가적인 스타일을 위한 CSS 파일 임포트

const Filter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleFilter = () => {
    onFilter({ minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage });
  };

  return (
    <Form className="filter-form">
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="minPrice" className="mb-3">
            <Form.Label column xs="4" className="filter-label">
              Min Price
            </Form.Label>
            <Col xs="8">
              <Form.Control
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="maxPrice" className="mb-3">
            <Form.Label column xs="4" className="filter-label">
              Max Price
            </Form.Label>
            <Col xs="8">
              <Form.Control
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="minYear" className="mb-3">
            <Form.Label column xs="4" className="filter-label">
              Min Year
            </Form.Label>
            <Col xs="8">
              <Form.Control
                type="number"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                placeholder="Min Year"
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="maxYear" className="mb-3">
            <Form.Label column xs="4" className="filter-label">
              Max Year
            </Form.Label>
            <Col xs="8">
              <Form.Control
                type="number"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                placeholder="Max Year"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="minMileage" className="mb-3">
            <Form.Label column xs="4" className="filter-label">
              Min Mileage
            </Form.Label>
            <Col xs="8">
              <Form.Control
                type="number"
                value={minMileage}
                onChange={(e) => setMinMileage(e.target.value)}
                placeholder="Min Mileage"
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="maxMileage" className="mb-3">
            <Form.Label column xs="4" className="filter-label">
              Max Mileage
            </Form.Label>
            <Col xs="8">
              <Form.Control
                type="number"
                value={maxMileage}
                onChange={(e) => setMaxMileage(e.target.value)}
                placeholder="Max Mileage"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button variant="primary" onClick={handleFilter}>
            Apply Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
