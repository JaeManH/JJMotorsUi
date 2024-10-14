import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CarItem.css"; // 새로운 스타일링 파일 임포트
import { Link } from "react-router-dom";

const CarItem = ({ car }) => {
    return (
        <Card className="car-item">
            <Card.Img variant="top" src={car.thumbnailImage} className="car-item-image" />
            <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>연식 : {car.year}년</Card.Text>
                <Card.Text>가격 : ${car.price.toLocaleString()}</Card.Text>
                {/* 차량의 ID를 이용하여 동적으로 생성된 URL로 이동하도록 설정 */}
                <Link to={`/mobilityModel/${car.id}`}>
                    <Button variant="primary">자세히 보기</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CarItem;
