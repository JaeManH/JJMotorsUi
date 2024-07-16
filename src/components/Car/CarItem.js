import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CarItem.css"; // 새로운 스타일링 파일 임포트
import { Link, useLocation } from "react-router-dom";

const CarItem = ({ car }) => {
  return (
    <Card className="car-item">
      <Card.Img variant="top" src={car.image} className="car-item-image" />
      <Card.Body>
        <Card.Title>{car.name}</Card.Title>
        <Card.Text>연식 : {car.year}</Card.Text>
        <Card.Text>주행거리 : {car.mileage} km</Card.Text>
        <Card.Text>가격 : ${car.price.toLocaleString()}</Card.Text>
        {/* <Link to={`/car/${car.id}`}> */}
        <Link to={`/car/example`}>
          <Button variant="primary">자세히 보기</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CarItem;
