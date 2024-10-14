import React, { useState, useCallback, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CarUploadPage = () => {
  const { id } = useParams();
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [carInfo, setCarInfo] = useState({
    modelName: "",
    price: "",
    year: "",
    stockStatus: "재고",
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
  const [successMessage, setSuccessMessage] = useState("");
  const [deletedImages, setDeletedImages] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchCarData = async (carId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/models/${id}`);
      const carData = response.data;

      // 초기 추가 탭 데이터를 담을 배열
      const newAdditionalTabs = [];

      // carData.parameters 배열을 상태에 매핑
      carData.parameters.forEach((param) => {
        switch (param.parameterName) {
          case "vehicleType":
          case "powerType":
          case "timeToMarket":
          case "vehicleStructure":
          case "overallDimensions":
          case "containerSize":
          case "wheelBase":
          case "curbWeight":
          case "maxFullLoadWeight":
            setBasicInfo((prev) => ({
              ...prev,
              [param.parameterName]: param.parameterValue,
            }));
            break;
          case "displacementMl":
          case "displacementL":
          case "horsepowerPs":
            setEngineInfo((prev) => ({
              ...prev,
              [param.parameterName]: param.parameterValue,
            }));
            break;
          case "motorTypeKW":
          case "motorHorsepowerPs":
          case "totalMotorTorque":
          case "batteryType":
          case "batteryBrand":
          case "necdPureElectricRange":
          case "batteryCapacity":
          case "powerConsumption":
          case "quickCharge":
          case "slowCharge":
          case "percentageOfFastCharge":
            setElectricMotorInfo((prev) => ({
              ...prev,
              [param.parameterName]: param.parameterValue,
            }));
            break;
          case "driveMode":
          case "fourWheelDrive":
            setChassisSteeringInfo((prev) => ({
              ...prev,
              [param.parameterName]: param.parameterValue,
            }));
            break;
          case "numberOfGears":
            setTransmissionInfo((prev) => ({
              ...prev,
              [param.parameterName]: param.parameterValue,
            }));
            break;
          default:
            // Additional tabs 처리
            let existingTab = newAdditionalTabs.find(
                (tab) => tab.title === param.category
            );

            if (existingTab) {
              existingTab.data[param.parameterName] = param.parameterValue;
              existingTab.fieldNames[param.parameterName] = param.parameterName;
            } else {
              // 새로운 탭 추가
              newAdditionalTabs.push({
                key: `customTab${newAdditionalTabs.length + 1}`,
                title: param.category,
                data: { [param.parameterName]: param.parameterValue },
                fieldNames: { [param.parameterName]: param.parameterName },
              });
            }
            break;
        }
      });

      setAdditionalTabs(newAdditionalTabs); // 가져온 데이터를 기반으로만 탭을 설정

      setCarInfo({
        modelName: carData.modelName || "",
        price: carData.price || "",
        year: carData.year || "",
        stockStatus: carData.stockStatus || "재고",
        seriesId: carData.series?.id || "",
      });

      setImages(
          carData.images.map((image, index) => ({
            id: image.id,
            url: image.imageUrl,
            isExisting: true,
          }))
      );

      setThumbnailIndex(carData.thumbnailIndex || 0);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };


  useEffect(() => {
    if (id) {
      fetchCarData(id); // 차량 ID가 있을 경우에만 데이터 불러오기
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/series`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data.content)) {
          setSeriesOptions(data.content);
        } else {
          setSeriesOptions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching series data:", error);
        setSeriesOptions([]);
      });
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imagePreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          fileName: file.name,
        })

      );

      setImages((prevImages) => [...prevImages, ...imagePreviews]);
    },
    [setImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/bmp": [],
      "image/webp": [],
    },
    multiple: true,
    onDropRejected: () => {
      alert("이미지 파일만 업로드 가능합니다.");
    },
  });

  const handleThumbnailSelect = (index) => {
    setThumbnailIndex(index);
  };

  const handleDeleteImage = (image, index) => {
    setImages((prevImages) =>
        prevImages.map((img, i) =>
            i === index ? { ...img, isDeleted: true } : img
        )
    );
    setDeletedImages((prevDeleted) => [...prevDeleted, image.url]);
    if (thumbnailIndex === index) {
      setThumbnailIndex(0);
    }
  };

  const handleRestoreImage = (index) => {
    setImages((prevImages) =>
        prevImages.map((img, i) =>
            i === index ? { ...img, isDeleted: false } : img
        )
    );
    setDeletedImages((prevDeleted) =>
        prevDeleted.filter((url) => url !== images[index].url)
    );
  };

  const handleInputChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdditionalTabInputChange = (e, tabKey) => {
    const { name, value } = e.target;
    setAdditionalTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.key === tabKey
          ? {
              ...tab,
              data: { ...tab.data, [name]: value },
            }
          : tab
      )
    );
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
    setErrorMessage(null);
    return true;
  };

  const resetForm = () => {
    setImages([]);
    setThumbnailIndex(0);
    setCarInfo({
      modelName: "",
      price: "",
      year: "",
      stockStatus: "재고",
    });
    setBasicInfo({
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
    setEngineInfo({
      displacementMl: "",
      displacementL: "",
      horsepowerPs: "",
    });
    setElectricMotorInfo({
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
    setChassisSteeringInfo({
      driveMode: "",
      fourWheelDrive: "",
    });
    setTransmissionInfo({
      numberOfGears: "",
    });
    setAdditionalTabs([]);
    setActiveKey("basic");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkForDuplicateFields()) {
      return;
    }

    const filterEmptyFields = (categoryName,data) =>
        Object.entries(data)
            .filter(([_, value]) => value.trim() !== "")
            .map(([key, value]) => ({
              category: categoryName,
              parameterName: key,
              parameterValue: value,
            }));

    const parameters = [
      ...filterEmptyFields("BasicInfo",basicInfo),
      ...filterEmptyFields("EngineInfo",engineInfo),
      ...filterEmptyFields("ElectricMotorInfo",electricMotorInfo),
      ...filterEmptyFields("ChassisSteeringInfo",chassisSteeringInfo),
      ...filterEmptyFields("TransmissionInfo",transmissionInfo),
      ...additionalTabs.flatMap((tab) =>
          Object.entries(tab.fieldNames).map(([key, fieldName]) => ({
            category: tab.title,
            parameterName: fieldName,
            parameterValue: tab.data[key]?.trim() || "",
          }))
      ),
    ];

    const formData = new FormData();
    formData.append("modelName", carInfo.modelName);
    formData.append("price", carInfo.price);
    formData.append("year", carInfo.year);
    formData.append("seriesId", carInfo.seriesId);
    formData.append("parameters", JSON.stringify(parameters));
    formData.append("thumbnailIndex", thumbnailIndex);
    formData.append("stockStatus", carInfo.stockStatus);

    // 모든 이미지를 DTO 형식으로 통합하여 FormData에 추가

    const imageDTOs = [ ...images].map((image, index) => ({
      id: image.id || null,
      imageName : !image.isExisting ? image.fileName : "",
      imageUrl: image.url || "",
      isThumbnail: thumbnailIndex === index,
      imageStatus: image.isDeleted ? "DELETED" : image.isExisting ? "UNCHANGED" : "NEW",
    }));

    formData.append("images", new Blob([JSON.stringify(imageDTOs)], { type: 'application/json' }  )); // 최종적으로 FormData에 DTO를 추가
    imageDTOs.map((dto) => console.log(dto));

    [ ...images].forEach((image, index) => {
      if (!image.isExisting && image instanceof File) {
        formData.append("imageFiles", image,image.name); // 새 이미지 파일을 DTO에 포함
      }
    });

    const requestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // console.log("FormData 내용 확인:");
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    if (id) {
      // PUT 요청으로 업데이트 처리
      axios
          .put(`${apiUrl}/api/models/${id}`, formData,requestConfig)
          .then((response) => {
            console.log("Update successful:", response.data);
            alert("수정에 성공했습니다!");
            resetForm();
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            console.error("There was an error uploading the data:", error);
          });
    } else {
      // POST 요청으로 새로운 모델 생성 처리
      axios
          .post(`${apiUrl}/api/models`, formData,requestConfig)
          .then((response) => {
            console.log("Upload successful:", response.data);
            alert("업로드에 성공했습니다!");
            resetForm();
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            console.error("There was an error uploading the data:", error);
          });
    }
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

  const handleDeleteTab = (tabKey) => {
    setAdditionalTabs((prevTabs) => prevTabs.filter((tab) => tab.key !== tabKey));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
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

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
      {/* 시리즈 선택 섹션 */}
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "bold", color: "#343a40" }}>
          모빌리티 시리즈 선택
        </Form.Label>
        <Form.Control
          as="select"
          name="seriesId"
          value={carInfo.seriesId}
          onChange={(e) => handleInputChange(e, setCarInfo)}
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#ced4da",
            color: "#495057",
          }}
        >
          <option value="">시리즈를 선택하세요</option>
          {Array.isArray(seriesOptions) &&
            seriesOptions.map((series) => (
              <option key={series.id} value={series.id}>
                {series.seriesName} - {series.brandName}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

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
              name="modelName"
              value={carInfo.modelName}
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
              src={image.isExisting ? image.url : image.preview}
              thumbnail
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: index === thumbnailIndex ? "3px solid #007bff" : "",
              }}
            />
            {image.isDeleted && (
                <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                >
                  X
                </div>
            )}
            {image.isDeleted ? (
                <Button
                    variant="success"
                    size="sm"
                    style={{ position: "absolute", bottom: "5px", right: "5px" }}
                    onClick={() => handleRestoreImage(index)}
                >
                  복원
                </Button>
            ) : (
                <>
                  <Button
                      variant="primary"
                      size="sm"
                      style={{ position: "absolute", top: "5px", right: "5px" }}
                      onClick={() => handleThumbnailSelect(index)}
                  >
                    썸네일 선택
                  </Button>
                  <Button
                      variant="danger"
                      size="sm"
                      style={{ position: "absolute", bottom: "5px", right: "5px" }}
                      onClick={() => handleDeleteImage(image, index)}
                  >
                    삭제
                  </Button>
                </>
            )}
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
                ["Battery brand", "batteryBrand"],
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control
                          type="text"
                          value={tab.title}
                          onChange={(e) => handleTabTitleChange(e, tab.key)}
                          onKeyPress={handleKeyPress}
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
                      <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteTab(tab.key)}
                          style={{ marginLeft: "5px", padding: "2px 6px", height: "100%" }}
                      >
                        X
                      </Button>
                    </div>
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
                              onKeyPress={handleKeyPress}
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
                                  handleAdditionalTabInputChange(e, tab.key)
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
          {id ? "수정" : "제품 업로드"}
        </Button>
      </Form>
    </div>
  );
};

export default CarUploadPage;
