import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/manufacturers"
        );
        console.log(response.data); // 데이터 확인
        const manufacturersData = response.data.content || []; // content 배열을 사용
        setManufacturers(manufacturersData);
      } catch (error) {
        console.error("제조사 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchManufacturers();
  }, []);

  const handleAddBrand = async () => {
    if (!manufacturerId) {
      alert("제조사를 선택해야 합니다.");
      return;
    }

    const newBrand = {
      brandName,
      logoUrl,
      manufacturerId, // 선택된 제조사 ID
      createdBy: "admin", // 관리자 이름, 실제로는 로그인된 유저 정보 사용
      createdDate: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:8080/api/brands", newBrand);
      navigate("/brands"); // 추가 후 브랜드 리스트 페이지로 이동
    } catch (error) {
      console.error("브랜드 추가 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">브랜드 추가</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formBrandName">
          <Form.Label column sm={2}>
            브랜드 이름
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="브랜드 이름"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formLogoUrl">
          <Form.Label column sm={2}>
            로고 URL
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="로고 URL"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formManufacturer">
          <Form.Label column sm={2}>
            제조사
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={manufacturerId}
              onChange={(e) => setManufacturerId(e.target.value)}
            >
              <option value="">제조사를 선택하세요</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.manufacturerName}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="primary" onClick={handleAddBrand}>
              브랜드 추가
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddBrand;
