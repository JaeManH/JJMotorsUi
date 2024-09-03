import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "./CarDetail.css"; // 스타일링 파일 임포트

const CarDetail = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 여기에 API 호출 로직을 추가합니다.
    const fetchData = async () => {
      try {
        const response = await fetch(`https://yourapi.com/cars/${id}`);
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car not found</div>;
  }

  // JSON 데이터로부터 필요한 정보들을 추출합니다.
  const {
    basicInfo,
    engineInfo,
    electricMotorInfo,
    chassisSteeringInfo,
    transmissionInfo,
    additionalTabs,
  } = carData;

  // JSON 데이터에서 key-value 형식으로 테이블을 생성합니다.
  const renderTableRows = (data) => {
    return data.map((item, index) => (
      <tr key={index}>
        <td>{item.key}</td>
        <td>{item.value}</td>
      </tr>
    ));
  };

  return (
    <div className="car-detail-container">
      <h1>{carData.name}</h1>
      <Carousel className="car-carousel">
        {carData.images.map((image, index) => (
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
              {renderTableRows(basicInfo)}
              {renderTableRows(engineInfo)}
              {renderTableRows(electricMotorInfo)}
              {renderTableRows(chassisSteeringInfo)}
              {renderTableRows(transmissionInfo)}
            </tbody>
          </Table>
          {additionalTabs &&
            additionalTabs.map((tab, index) => (
              <div key={index}>
                <h3>{tab.title}</h3>
                <Table striped bordered hover>
                  <tbody>{renderTableRows(tab.data)}</tbody>
                </Table>
              </div>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarDetail;
