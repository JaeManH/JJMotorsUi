import React, { useState, useCallback } from "react";
import { Tabs, Tab, Form, Button, Image, Container } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

const CarUploadPage = () => {
  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [carInfo, setCarInfo] = useState({
    // 기본 정보
    vehicleType: "",
    powerType: "",
    timeToMarket: "",
    vehicleStructure: "",
    overallDimensions: "",
    containerSize: "",
    wheelBase: "",
    curbWeight: "",
    maxFullLoadWeight: "",
    // 엔진
    displacementMl: "",
    displacementL: "",
    horsepowerPs: "",
    // 전기모터
    motorTypeKW: "",
    motorHorsepowerPs: "",
    totalMotorTorque: "",
    batteryType: "",
    batteryBrand: "",
    necdPureElectricRange: "",
    batteryCapacity: "",
    powerConsumption: "",
    quickCharge: "",
    slowCharge: "",
    percentageOfFastCharge: "",
    // Chassis Steering
    driveMode: "",
    fourWheelDrive: "",
    // Transmission
    numberOfGears: "",
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setImages([...images, ...imageUrls]);
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleThumbnailSelect = (index) => {
    setThumbnailIndex(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarInfo({ ...carInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Car Info:", carInfo);
    console.log("Images:", images);
    console.log("Thumbnail Index:", thumbnailIndex);
  };

  const renderFormGroups = (fields) => {
    return fields.map(([label, name]) => (
      <Form.Group className="mb-3" key={name}>
        <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
          {label}
        </Form.Label>
        <Form.Control
          type="text"
          name={name}
          value={carInfo[name]}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#ced4da",
            color: "#495057",
          }}
        />
      </Form.Group>
    ));
  };

  const basicInfoFields = [
    ["Vehicle Type", "vehicleType"],
    ["Power Type", "powerType"],
    ["Time to Market", "timeToMarket"],
    ["Vehicle Structure", "vehicleStructure"],
    ["Overall Dimensions (L*W*H)", "overallDimensions"],
    ["Container Size", "containerSize"],
    ["Wheel Base", "wheelBase"],
    ["Curb Weight", "curbWeight"],
    ["Max Full Load Weight", "maxFullLoadWeight"],
  ];

  const engineFields = [
    ["Displacement (ml)", "displacementMl"],
    ["Displacement (L)", "displacementL"],
    ["Horsepower (Ps)", "horsepowerPs"],
  ];

  const electricMotorFields = [
    ["Motor Type (KW)", "motorTypeKW"],
    ["Motor Horsepower (Ps)", "motorHorsepowerPs"],
    ["Total Motor Torque (N.m)", "totalMotorTorque"],
    ["Battery Type", "batteryType"],
    ["Battery Brand", "batteryBrand"],
    ["NECD Pure Electric Range (km)", "necdPureElectricRange"],
    ["Battery Capacity (kWh)", "batteryCapacity"],
    ["Power Consumption (kWh/100km)", "powerConsumption"],
    ["Quick Charge (h)", "quickCharge"],
    ["Slow Charge (h)", "slowCharge"],
    ["Percentage of Fast Charge (%)", "percentageOfFastCharge"],
  ];

  const chassisSteeringFields = [
    ["Drive Mode", "driveMode"],
    ["Four-Wheel Drive", "fourWheelDrive"],
  ];

  const transmissionFields = [["Number of Gears", "numberOfGears"]];

  return (
    <div
      className="container mt-5 p-4"
      style={{
        backgroundColor: "#f8f9fa",
        color: "#000000",
        borderRadius: "8px",
      }}
    >
      <style type="text/css">
        {`
          .nav-tabs .nav-link {
            color: #495057;
            background-color: #e9ecef;
            border: 1px solid #dee2e6;
          }
          .nav-tabs .nav-link.active {
            color: #495057;
            background-color: #fff;
            border-color: #dee2e6 #dee2e6 #fff;
          }
        `}
      </style>

      <h1 className="mb-4" style={{ color: "#343a40" }}>
        자동차 제품 업로드
      </h1>

      {/* 이미지 업로드 섹션은 그대로 유지 */}

      <Form onSubmit={handleSubmit}>
        <Tabs
          defaultActiveKey="basic"
          className="mb-3"
          style={{
            borderBottom: "2px solid #007bff",
          }}
        >
          <Tab eventKey="basic" title="기본 정보" tabClassName="text-dark">
            {renderFormGroups(basicInfoFields)}
          </Tab>
          <Tab eventKey="engine" title="엔진" tabClassName="text-dark">
            {renderFormGroups(engineFields)}
          </Tab>
          <Tab
            eventKey="electricMotor"
            title="전기모터"
            tabClassName="text-dark"
          >
            {renderFormGroups(electricMotorFields)}
          </Tab>
          <Tab
            eventKey="chassisSteering"
            title="Chassis Steering"
            tabClassName="text-dark"
          >
            {renderFormGroups(chassisSteeringFields)}
          </Tab>
          <Tab
            eventKey="transmission"
            title="Transmission"
            tabClassName="text-dark"
          >
            {renderFormGroups(transmissionFields)}
          </Tab>
        </Tabs>

        <Button variant="primary" type="submit">
          제품 업로드
        </Button>
      </Form>
    </div>
  );
};

export default CarUploadPage;
