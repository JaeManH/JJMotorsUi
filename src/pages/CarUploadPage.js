import React, { useState, useCallback } from "react";
import { Tabs, Tab, Form, Button, Image, Container } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarUploadPage.css";

const CarUploadPage = () => {
  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [carInfo, setCarInfo] = useState({
    vehicleType: "",
    powerType: "",
    timeToMarket: "",
    vehicleStructure: "",
    overallDimensions: "",
    containerSize: "",
    wheelBase: "",
    curbWeight: "",
    maxFullLoadWeight: "",
    displacementMl: "",
    displacementL: "",
    horsepowerPs: "",
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
    driveMode: "",
    fourWheelDrive: "",
    numberOfGears: "",
  });

  const [additionalTabs, setAdditionalTabs] = useState([]);
  const [activeKey, setActiveKey] = useState("basic");

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

  const handleInputChange = (e, tabKey) => {
    const { name, value } = e.target;
    if (
      tabKey === "basic" ||
      tabKey === "engine" ||
      tabKey === "electricMotor" ||
      tabKey === "chassisSteering" ||
      tabKey === "transmission"
    ) {
      setCarInfo({ ...carInfo, [name]: value });
    } else {
      setAdditionalTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.key === tabKey
            ? { ...tab, data: { ...tab.data, [name]: value } }
            : tab
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 데이터 구조화
    const tabsData = {
      basicInfo: {
        vehicleType: carInfo.vehicleType,
        powerType: carInfo.powerType,
        timeToMarket: carInfo.timeToMarket,
        vehicleStructure: carInfo.vehicleStructure,
        overallDimensions: carInfo.overallDimensions,
        containerSize: carInfo.containerSize,
        wheelBase: carInfo.wheelBase,
        curbWeight: carInfo.curbWeight,
        maxFullLoadWeight: carInfo.maxFullLoadWeight,
      },
      engine: {
        displacementMl: carInfo.displacementMl,
        displacementL: carInfo.displacementL,
        horsepowerPs: carInfo.horsepowerPs,
      },
      electricMotor: {
        motorTypeKW: carInfo.motorTypeKW,
        motorHorsepowerPs: carInfo.motorHorsepowerPs,
        totalMotorTorque: carInfo.totalMotorTorque,
        batteryType: carInfo.batteryType,
        batteryBrand: carInfo.batteryBrand,
        necdPureElectricRange: carInfo.necdPureElectricRange,
        batteryCapacity: carInfo.batteryCapacity,
        powerConsumption: carInfo.powerConsumption,
        quickCharge: carInfo.quickCharge,
        slowCharge: carInfo.slowCharge,
        percentageOfFastCharge: carInfo.percentageOfFastCharge,
      },
      chassisSteering: {
        driveMode: carInfo.driveMode,
        fourWheelDrive: carInfo.fourWheelDrive,
      },
      transmission: {
        numberOfGears: carInfo.numberOfGears,
      },
    };

    // 추가된 탭의 데이터 포함
    additionalTabs.forEach((tab) => {
      tabsData[tab.key] = tab.data;
    });

    console.log("Structured Data:", tabsData);
    console.log("Images:", images);
    console.log("Thumbnail Index:", thumbnailIndex);

    // 전송할 데이터를 아래의 예시처럼 구조화할 수 있습니다.
    // axios.post('/api/upload', { carData: tabsData, images, thumbnailIndex });
  };

  const renderFormGroups = (fields, tabKey) => {
    return fields.map(([label, name]) => (
      <Form.Group className="mb-3" key={name}>
        <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
          {label}
        </Form.Label>
        <Form.Control
          type="text"
          name={name}
          value={
            tabKey
              ? additionalTabs.find((tab) => tab.key === tabKey)?.data[name] ||
                ""
              : carInfo[name]
          }
          onChange={(e) => handleInputChange(e, tabKey)}
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

  const handleAddTab = () => {
    const newKey = `customTab${additionalTabs.length + 1}`;
    setAdditionalTabs([
      ...additionalTabs,
      {
        key: newKey,
        title: `Custom Tab ${additionalTabs.length + 1}`,
        data: {},
      },
    ]);
    setActiveKey(newKey);
  };

  const tabStyle = `
    .nav-tabs .nav-link {
      color: var(--theme-dark) !important;
      background-color: #e9ecef;
      border: 1px solid #dee2e6;
      margin-right: 5px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      padding: 10px 15px;
      font-weight: 500;
    }

    .nav-tabs .nav-link:hover {
      border-color: #007bff;
      color: #007bff !important;
      background-color: #f1f3f5;
    }

    .nav-tabs .nav-link.active {
      color: #fff !important;
      background-color: #007bff;
      border-color: #007bff;
      font-weight: bold;
    }
  `;

  return (
    <div
      className="container mt-5 p-4"
      style={{
        backgroundColor: "#f8f9fa",
        color: "#000000",
        borderRadius: "8px",
      }}
    >
      <style>{tabStyle}</style>
      <h1 className="mb-4" style={{ color: "#343a40" }}>
        자동차 제품 업로드
      </h1>

      {/* 이미지 업로드 섹션 */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #007bff",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>이미지를 여기에 드래그하거나 클릭하여 업로드하세요.</p>
      </div>

      {/* 업로드된 이미지 미리보기 및 썸네일 선택 */}
      <Container className="d-flex flex-wrap">
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              margin: "10px",
            }}
          >
            <Image
              src={image}
              thumbnail
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: index === thumbnailIndex ? "3px solid #007bff" : "",
              }}
            />
            <Button
              variant="primary"
              size="sm"
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
              }}
              onClick={() => handleThumbnailSelect(index)}
            >
              썸네일 선택
            </Button>
          </div>
        ))}
      </Container>

      <Form onSubmit={handleSubmit}>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
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
          {additionalTabs.map((tab) => (
            <Tab
              key={tab.key}
              eventKey={tab.key}
              title={tab.title}
              tabClassName="text-dark"
            >
              {renderFormGroups([], tab.key)}{" "}
              {/* 탭 안에 추가할 폼 항목들을 넣어주세요 */}
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
                  Custom Field 1
                </Form.Label>
                <Form.Control
                  type="text"
                  name="customField1"
                  value={tab.data.customField1 || ""}
                  onChange={(e) => handleInputChange(e, tab.key)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#ced4da",
                    color: "#495057",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
                  Custom Field 2
                </Form.Label>
                <Form.Control
                  type="text"
                  name="customField2"
                  value={tab.data.customField2 || ""}
                  onChange={(e) => handleInputChange(e, tab.key)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#ced4da",
                    color: "#495057",
                  }}
                />
              </Form.Group>
            </Tab>
          ))}
        </Tabs>

        <Button variant="secondary" onClick={handleAddTab} className="mb-3">
          탭 추가
        </Button>

        <Button variant="primary" type="submit">
          제품 업로드
        </Button>
      </Form>
    </div>
  );
};

export default CarUploadPage;
