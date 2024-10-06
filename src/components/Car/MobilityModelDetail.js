import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Axios 임포트
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import "./MobilityModelDetail.css"; // 스타일링 파일 추가

const MobilityModelDetail = () => {
  const { id } = useParams(); // URL에서 ID 파라미터 가져오기
  const [carData, setCarData] = useState(null); // API로부터 데이터를 저장할 상태
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // ID로 자동차 데이터를 가져오는 함수
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/MobilityModel/${id}`);
        setCarData(response.data);
        console.log("Fetched car data:", response.data); // 데이터 로그 출력
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car data not found</div>;
  }

  // carData의 detailsJson을 객체로 파싱
  const carDetails = JSON.parse(carData.detailsJson);

  // 각 데이터 섹션을 렌더링하는 함수
  const renderDetailsSection = (title, data) => (
    <>
      <h3>{title}</h3>
      <Table striped bordered hover className="details-table">
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.key}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );

  return (
    <div className="mobility-model-detail-container">
      <h1>{carData.modelName}</h1>
      <div className="model-details">
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
        <Table striped bordered hover className="details-table">
          <tbody>
            <tr>
              <td>Price</td>
              <td>{carData.price}</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{carData.year}</td>
            </tr>
            <tr>
              <td>Stock Status</td>
              <td>{carData.stockStatus}</td>
            </tr>
          </tbody>
        </Table>
        <div className="additional-details">
          <h2>Car Details</h2>
          {carDetails.basicInfo &&
            renderDetailsSection("Basic Info", carDetails.basicInfo)}
          {carDetails.engineInfo &&
            renderDetailsSection("Engine Info", carDetails.engineInfo)}
          {carDetails.electricMotorInfo &&
            renderDetailsSection(
              "Electric Motor Info",
              carDetails.electricMotorInfo
            )}
          {carDetails.chassisSteeringInfo &&
            renderDetailsSection(
              "Chassis & Steering Info",
              carDetails.chassisSteeringInfo
            )}
          {carDetails.transmissionInfo &&
            renderDetailsSection(
              "Transmission Info",
              carDetails.transmissionInfo
            )}
          {carDetails.additionalTabs &&
            carDetails.additionalTabs.map((tab, index) =>
              renderDetailsSection(
                tab.title || `Additional Tab ${index + 1}`,
                tab.data || []
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default MobilityModelDetail;
