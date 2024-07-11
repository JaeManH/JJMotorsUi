import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import CarItem from "./CarItem";
import { useNavigate } from "react-router-dom";

const CarList = ({ title, cars, category }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(`/category/${category}?page=1`);
  };

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{title}</h2>
        <Button variant="primary" onClick={handleMoreClick}>
          더보기
        </Button>
      </div>
      <Row>
        {cars.slice(0, 4).map((car, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CarItem car={car} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CarList;
