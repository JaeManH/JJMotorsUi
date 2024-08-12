import React, { useState, useCallback } from "react";
import {
  Tabs,
  Tab,
  Form,
  Button,
  Image,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarUploadPage.css";
import axios from "axios";

const CarUploadPage = () => {
  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [carInfo, setCarInfo] = useState({
    vehicleName: "",
    price: "",
    year: "",
    stockStatus: "재고", // 기본값은 '재고'
  });

  const [basicInfo, setBasicInfo] = useState({
    vehicleType: "",
    powerType: "",
    timeToMarket: "",
    vehicleStructure: "",
    overallDimensions: "",
    containerSize: "",
    wheelBase: "",
    curbWeight: "",
    maxFullLoadWeight: "",
  });

  const [engineInfo, setEngineInfo] = useState({
    displacementMl: "",
    displacementL: "",
    horsepowerPs: "",
  });

  const [electricMotorInfo, setElectricMotorInfo] = useState({
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
  });

  const [chassisSteeringInfo, setChassisSteeringInfo] = useState({
    driveMode: "",
    fourWheelDrive: "",
  });

  const [transmissionInfo, setTransmissionInfo] = useState({
    numberOfGears: "",
  });

  const [additionalTabs, setAdditionalTabs] = useState([]);
  const [activeKey, setActiveKey] = useState("basic");
  const [errorMessage, setErrorMessage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setImages([...images, ...imageUrls]);
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/bmp": [],
      "image/webp": [],
    }, // 허용되는 이미지 형식
    multiple: true,
    onDropRejected: () => {
      alert("이미지 파일만 업로드 가능합니다.");
    },
  });

  const handleThumbnailSelect = (index) => {
    setThumbnailIndex(index);
  };

  const handleInputChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockStatusChange = (e) => {
    const { value } = e.target;
    setCarInfo((prev) => ({ ...prev, stockStatus: value }));
  };

  const handleTabTitleChange = (e, tabKey) => {
    const { value } = e.target;
    setAdditionalTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.key === tabKey ? { ...tab, title: value } : tab
      )
    );
  };

  const handleFieldNameChange = (e, tabKey, fieldKey) => {
    const { value } = e.target;
    setAdditionalTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.key === tabKey
          ? {
              ...tab,
              fieldNames: {
                ...tab.fieldNames,
                [fieldKey]: value,
              },
            }
          : tab
      )
    );
  };

  const handleAddField = (tabKey) => {
    setAdditionalTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.key === tabKey) {
          const newFieldKey = `customField${
            Object.keys(tab.fieldNames).length + 1
          }`;
          return {
            ...tab,
            fieldNames: {
              ...tab.fieldNames,
              [newFieldKey]: `New Field ${
                Object.keys(tab.fieldNames).length + 1
              }`,
            },
            data: {
              ...tab.data,
              [newFieldKey]: "",
            },
          };
        }
        return tab;
      })
    );
  };

  const handleDeleteField = (tabKey, fieldKey) => {
    setAdditionalTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.key === tabKey) {
          const newFieldNames = { ...tab.fieldNames };
          const newData = { ...tab.data };
          delete newFieldNames[fieldKey];
          delete newData[fieldKey];
          return {
            ...tab,
            fieldNames: newFieldNames,
            data: newData,
          };
        }
        return tab;
      })
    );
  };

  const checkForDuplicateFields = () => {
    const tabNames = new Set();

    for (let tab of additionalTabs) {
      if (tabNames.has(tab.title)) {
        setErrorMessage("탭 이름이 중복되었습니다.");
        return false;
      }
      tabNames.add(tab.title);

      const fieldNames = new Set();
      for (let fieldName of Object.values(tab.fieldNames)) {
        if (fieldNames.has(fieldName)) {
          setErrorMessage("같은 탭 내에서 필드 이름이 중복되었습니다.");
          return false;
        }
        fieldNames.add(fieldName);
      }
    }
    setErrorMessage(null); // 중복이 없으면 에러 메시지 제거
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 중복 필드나 탭 이름 체크
    if (!checkForDuplicateFields()) {
      return;
    }

    // 데이터 구조화
    const filterEmptyFields = (data) =>
      Object.entries(data)
        .filter(([_, value]) => value.trim() !== "")
        .map(([key, value]) => ({ key, value }));

    const tabsData = {
      vehicleName: carInfo.vehicleName,
      price: carInfo.price,
      year: carInfo.year,
      basicInfo: filterEmptyFields(basicInfo),
      engineInfo: filterEmptyFields(engineInfo),
      electricMotorInfo: filterEmptyFields(electricMotorInfo),
      chassisSteeringInfo: filterEmptyFields(chassisSteeringInfo),
      transmissionInfo: filterEmptyFields(transmissionInfo),
    };

    additionalTabs.forEach((tab) => {
      const tabData = Object.entries(tab.fieldNames)
        .map(([key, fieldName]) => {
          const value = tab.data[key]?.trim();
          return value ? { key: fieldName, value } : null;
        })
        .filter((item) => item !== null);

      if (tabData.length > 0) {
        tabsData[tab.title] = tabData;
      }
    });

    console.log("Structured Data:", tabsData);
    console.log("Images:", images);
    console.log("Thumbnail Index:", thumbnailIndex);

    // 전송할 데이터를 아래의 예시처럼 구조화할 수 있습니다.
    axios.post("http://localhost:8080/api/upload", {
      ...tabsData,
      images,
      thumbnailIndex,
    });
  };

  const handleAddTab = () => {
    const newKey = `customTab${additionalTabs.length + 1}`;
    const newTab = {
      key: newKey,
      title: `Custom Tab ${additionalTabs.length + 1}`,
      data: {},
      fieldNames: {
        customField1: "Custom Field 1",
        customField2: "Custom Field 2",
      },
    };
    setAdditionalTabs([...additionalTabs, newTab]);
    setActiveKey(newKey);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // 포커스를 해제
    }
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
      height: 42px;
      line-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
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

    .nav-tabs .add-tab-button {
      color: #007bff !important;
      background-color: #e9ecef;
      border: 1px solid #dee2e6;
      border-radius: 5px;
      margin-left: 5px;
      padding: 10px 15px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 42px;
      line-height: 20px;
    }

    .nav-tabs .add-tab-button:hover {
      color: #0056b3 !important;
    }

    .add-field-button {
      margin-top: 10px;
      background-color: #28a745;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .add-field-button:hover {
      background-color: #218838;
    }

    .delete-field-button {
      background-color: #dc3545;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
    }

    .delete-field-button:hover {
      background-color: #c82333;
    }
  `;

  const renderFormGroups = (fields, state, stateSetter) => {
    return fields.map(([label, name]) => (
      <Form.Group className="mb-3" key={name}>
        <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
          {label}
        </Form.Label>
        <Form.Control
          type="text"
          name={name}
          value={state[name]}
          onChange={(e) => handleInputChange(e, stateSetter)}
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#ced4da",
            color: "#495057",
          }}
        />
      </Form.Group>
    ));
  };

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

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      {/* 재고/중고 선택 섹션 */}
      <Form.Group
        className="mb-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Form.Label
          style={{ marginRight: "15px", fontWeight: "bold", color: "#343a40" }}
        >
          차량 상태:
        </Form.Label>
        <Form.Check
          inline
          label="재고"
          type="radio"
          id="stock"
          name="stockStatus"
          value="재고"
          checked={carInfo.stockStatus === "재고"}
          onChange={handleStockStatusChange}
          style={{ marginRight: "20px" }}
        />
        <Form.Check
          inline
          label="중고"
          type="radio"
          id="used"
          name="stockStatus"
          value="중고"
          checked={carInfo.stockStatus === "중고"}
          onChange={handleStockStatusChange}
        />
      </Form.Group>

      {/* 공통 정보 입력 섹션 */}
      <h2 style={{ color: "#343a40", marginBottom: "20px" }}>공통 정보</h2>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
              차량명
            </Form.Label>
            <Form.Control
              type="text"
              name="vehicleName"
              value={carInfo.vehicleName}
              onChange={(e) => handleInputChange(e, setCarInfo)}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ced4da",
                color: "#495057",
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
              가격
            </Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={carInfo.price}
              onChange={(e) => handleInputChange(e, setCarInfo)}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ced4da",
                color: "#495057",
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
              연식
            </Form.Label>
            <Form.Control
              type="text"
              name="year"
              value={carInfo.year}
              onChange={(e) => handleInputChange(e, setCarInfo)}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ced4da",
                color: "#495057",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

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
          onSelect={(k) => k !== "add" && setActiveKey(k)}
          className="mb-3"
          style={{
            borderBottom: "2px solid #007bff",
          }}
        >
          <Tab eventKey="basic" title="기본 정보" tabClassName="text-dark">
            {renderFormGroups(
              [
                ["Vehicle Type", "vehicleType"],
                ["Power Type", "powerType"],
                ["Time to Market", "timeToMarket"],
                ["Vehicle Structure", "vehicleStructure"],
                ["Overall Dimensions (L*W*H)", "overallDimensions"],
                ["Container Size", "containerSize"],
                ["Wheel Base", "wheelBase"],
                ["Curb Weight", "curbWeight"],
                ["Max Full Load Weight", "maxFullLoadWeight"],
              ],
              basicInfo,
              setBasicInfo
            )}
          </Tab>
          <Tab eventKey="engine" title="엔진" tabClassName="text-dark">
            {renderFormGroups(
              [
                ["Displacement (ml)", "displacementMl"],
                ["Displacement (L)", "displacementL"],
                ["Horsepower (Ps)", "horsepowerPs"],
              ],
              engineInfo,
              setEngineInfo
            )}
          </Tab>
          <Tab
            eventKey="electricMotor"
            title="전기모터"
            tabClassName="text-dark"
          >
            {renderFormGroups(
              [
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
              ],
              electricMotorInfo,
              setElectricMotorInfo
            )}
          </Tab>
          <Tab
            eventKey="chassisSteering"
            title="Chassis Steering"
            tabClassName="text-dark"
          >
            {renderFormGroups(
              [
                ["Drive Mode", "driveMode"],
                ["Four-Wheel Drive", "fourWheelDrive"],
              ],
              chassisSteeringInfo,
              setChassisSteeringInfo
            )}
          </Tab>
          <Tab
            eventKey="transmission"
            title="Transmission"
            tabClassName="text-dark"
          >
            {renderFormGroups(
              [["Number of Gears", "numberOfGears"]],
              transmissionInfo,
              setTransmissionInfo
            )}
          </Tab>
          {additionalTabs.map((tab) => (
            <Tab
              key={tab.key}
              eventKey={tab.key}
              title={
                <Form.Control
                  type="text"
                  value={tab.title}
                  onChange={(e) => handleTabTitleChange(e, tab.key)}
                  onKeyPress={handleKeyPress} // 엔터키를 처리
                  style={{
                    backgroundColor: "#e9ecef",
                    border: "none",
                    textAlign: "center",
                    fontWeight: "bold",
                    height: "100%",
                    width: "100%",
                    padding: "5px",
                    margin: "0",
                  }}
                />
              }
              tabClassName="text-dark"
            >
              {Object.entries(tab.fieldNames).map(([fieldKey, fieldLabel]) => (
                <Form.Group className="mb-3" key={fieldKey}>
                  <Row className="align-items-center">
                    <Col>
                      <Form.Control
                        type="text"
                        value={fieldLabel}
                        onChange={(e) =>
                          handleFieldNameChange(e, tab.key, fieldKey)
                        }
                        onKeyPress={handleKeyPress} // 엔터키를 처리
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#ced4da",
                          color: "#495057",
                          marginBottom: "5px",
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name={fieldKey}
                        value={tab.data[fieldKey] || ""}
                        onChange={(e) =>
                          handleInputChange(e, (update) => {
                            setAdditionalTabs((prevTabs) =>
                              prevTabs.map((t) =>
                                t.key === tab.key
                                  ? { ...t, data: { ...t.data, ...update } }
                                  : t
                              )
                            );
                          })
                        }
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#ced4da",
                          color: "#495057",
                        }}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        className="delete-field-button"
                        onClick={() => handleDeleteField(tab.key, fieldKey)}
                      >
                        삭제
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              ))}
              <Button
                className="add-field-button"
                onClick={() => handleAddField(tab.key)}
              >
                필드 추가
              </Button>
            </Tab>
          ))}
          <Tab
            eventKey="add"
            title={
              <div
                className="add-tab-button"
                onClick={handleAddTab}
                style={{ cursor: "pointer" }}
              >
                +
              </div>
            }
            tabClassName="add-tab"
          />
        </Tabs>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          제품 업로드
        </Button>
      </Form>
    </div>
  );
};

export default CarUploadPage;
