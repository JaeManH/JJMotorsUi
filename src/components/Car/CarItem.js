import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CarItem.css"; // 새로운 스타일링 파일 임포트

const CarItem = ({ car }) => {
  return (
    <Card className="car-item">
      <Card.Img variant="top" src={car.image} className="car-item-image" />
      <Card.Body>
        <Card.Title>{car.name}</Card.Title>
        <Card.Text>
          {car.year} | {car.mileage} km
        </Card.Text>
        <Card.Text>${car.price.toLocaleString()}</Card.Text>
        <Button variant="primary">자세히 보기</Button>
      </Card.Body>
    </Card>
  );
};

export default CarItem;
