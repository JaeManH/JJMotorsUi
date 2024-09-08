import React, { useState } from "react";
import { Container, Form, Button, Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

const MobilitySeriesUploadPage = () => {
  const [seriesName, setSeriesName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setLogoImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/bmp": [],
      "image/webp": [],
    },
    multiple: false,
    onDropRejected: () => {
      setErrorMessage("로고 이미지는 이미지 파일만 가능합니다.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seriesName || !manufacturer || !description || !logoImage) {
      setErrorMessage("모든 필드를 입력하고 이미지를 업로드하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("seriesName", seriesName);
    formData.append("manufacturer", manufacturer);
    formData.append("description", description);
    formData.append("logoImage", logoImage);

    try {
      const response = await axios.post(
        "http://localhost:8080/mobilitySeries/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("모빌리티 시리즈가 성공적으로 등록되었습니다!");
      setTimeout(() => {
        navigate("/"); // 성공 시 메인 페이지로 리다이렉트
      }, 2000);
    } catch (error) {
      setErrorMessage("등록 중 오류가 발생했습니다.");
      console.error("Error uploading series:", error);
    }
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{
        maxWidth: "600px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="mb-4 text-center">모빌리티 시리즈 등록</h1>

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
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="seriesName" className="mb-3">
          <Form.Label>시리즈명</Form.Label>
          <Form.Control
            type="text"
            placeholder="시리즈명을 입력하세요"
            value={seriesName}
            onChange={(e) => setSeriesName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="manufacturer" className="mb-3">
          <Form.Label>제조사</Form.Label>
          <Form.Control
            type="text"
            placeholder="제조사를 입력하세요"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>설명</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="logoImage" className="mb-3">
          <Form.Label>로고 이미지</Form.Label>
          <div
            {...getRootProps()}
            className="border p-3 text-center"
            style={{
              borderRadius: "8px",
              cursor: "pointer",
              borderColor: "#ced4da",
              backgroundColor: "#f8f9fa",
            }}
          >
            <input {...getInputProps()} />
            {logoImage ? (
              <div>
                <Image
                  src={URL.createObjectURL(logoImage)}
                  alt="logo preview"
                  fluid
                  style={{ maxWidth: "150px", marginTop: "10px" }}
                />
                <p>{logoImage.name}</p>
              </div>
            ) : (
              <p>이미지를 여기에 드래그하거나 클릭하여 업로드하세요.</p>
            )}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          등록하기
        </Button>
      </Form>
    </Container>
  );
};

export default MobilitySeriesUploadPage;
