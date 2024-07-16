import React from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "./CarDetail.css"; // 스타일링 파일 임포트

const CarDetail = ({ cars }) => {
  //   const { id } = useParams();
  //   const car = cars.find((car) => car.id === parseInt(id));

  const car = {
    id: 11,
    images: [
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    name: "Truck 1",
    mileage: 20000,
    year: 2018,
    price: 30000,
    discountPrice: 29000,
  };

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="car-detail-container">
      <h1>{car.model}</h1>
      <Carousel className="car-carousel">
        {car.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Car image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card className="car-detail-card">
        <Card.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>차량 모델</td>
                <td>{car.model}</td>
              </tr>
              <tr>
                <td>차량 유형</td>
                <td>{car.type}</td>
              </tr>
              <tr>
                <td>전원 유형</td>
                <td>{car.powerType}</td>
              </tr>
              <tr>
                <td>출시 시간</td>
                <td>{car.releaseDate}</td>
              </tr>
              <tr>
                <td>차량 구조</td>
                <td>{car.structure}</td>
              </tr>
              <tr>
                <td>차대길이 L*W*H (mm)</td>
                <td>{car.dimensions}</td>
              </tr>
              <tr>
                <td>휠베이스（mm）</td>
                <td>{car.wheelbase}</td>
              </tr>
              <tr>
                <td>공차 중량(kg)</td>
                <td>{car.curbWeight}</td>
              </tr>
              <tr>
                <td>최대 적재 중량(kg)</td>
                <td>{car.maxLoad}</td>
              </tr>
              <tr>
                <td>모터 유형（KW）</td>
                <td>{car.motorType}</td>
              </tr>
              <tr>
                <td>모터 마력(ps)</td>
                <td>{car.motorPower}</td>
              </tr>
              <tr>
                <td>총 모터 토크(Nm)</td>
                <td>{car.motorTorque}</td>
              </tr>
              <tr>
                <td>배터리 유형</td>
                <td>{car.batteryType}</td>
              </tr>
              <tr>
                <td>배터리 브랜드</td>
                <td>{car.batteryBrand}</td>
              </tr>
              <tr>
                <td>WLTC 순수 전기 주행거리（km）</td>
                <td>{car.range}</td>
              </tr>
              <tr>
                <td>배터리 용량(kWh)</td>
                <td>{car.batteryCapacity}</td>
              </tr>
              <tr>
                <td>전력 소비량(kWh/100km)</td>
                <td>{car.powerConsumption}</td>
              </tr>
              <tr>
                <td>드라이브 유형</td>
                <td>{car.driveType}</td>
              </tr>
              <tr>
                <td>기어 수</td>
                <td>{car.gears}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarDetail;
