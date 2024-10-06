import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSeries = () => {
  const [seriesName, setSeriesName] = useState("");
  const [mobilityType, setMobilityType] = useState("");
  const [description, setDescription] = useState("");
  const [brands, setBrands] = useState([]); // 브랜드 목록
  const [selectedBrand, setSelectedBrand] = useState(""); // 선택된 브랜드 ID
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // 페이지가 로드될 때 브랜드 목록을 불러옴
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("${apiUrl}/api/brands");
      setBrands(response.data); // 브랜드 데이터를 상태로 저장
    } catch (error) {
      console.error("브랜드 데이터를 가져오는 중 오류가 발생했습니다:", error);
      setErrorMessage("브랜드 데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // 오류 메시지를 초기화

    if (!seriesName || !mobilityType || !selectedBrand) {
      setErrorMessage("모든 필수 항목을 입력해 주세요.");
      return;
    }

    const newSeries = {
      seriesName,
      mobilityType,
      description,
      brandId: selectedBrand, // 선택된 브랜드 ID만 전달
    };

    try {
      // API 요청
      const response = await axios.post("${apiUrl}/api/series", newSeries);

      if (response.status === 201) {
        // 상태 코드 201 (Created) 확인
        // 성공 알림 띄우기
        toast.success("시리즈가 성공적으로 추가되었습니다!", {
          position: "top-center", // 문자열로 직접 지정
          autoClose: 2000, // 2초 후 자동으로 닫힘
        });

        // 2초 후 시리즈 리스트 페이지로 이동
        setTimeout(() => {
          navigate("/admin/series");
        }, 2000);
      } else {
        // 상태 코드가 201이 아닌 경우 오류 처리
        setErrorMessage("시리즈 추가 중 문제가 발생했습니다.");
      }
    } catch (error) {
      // catch 블록: 요청 실패 시 처리
      console.error("시리즈 추가 오류:", error);

      // 오류 처리: 서버에서 받은 응답 데이터가 있는 경우
      if (error.response) {
        setErrorMessage(
          `오류: ${
            error.response.data.message || "시리즈 추가 중 오류가 발생했습니다."
          }`
        );
      } else if (error.request) {
        setErrorMessage("서버로부터 응답이 없습니다.");
      } else {
        setErrorMessage("시리즈 추가 중 오류가 발생했습니다.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/admin/series-list"); // 시리즈 목록 페이지로 이동
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">시리즈 추가</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Toast 컨테이너 추가 */}
      <ToastContainer />

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formSeriesName">
              <Form.Label>시리즈 이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="시리즈 이름을 입력하세요"
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formMobilityType">
              <Form.Label>모빌리티 타입</Form.Label>
              <Form.Control
                type="text"
                placeholder="모빌리티 타입을 입력하세요"
                value={mobilityType}
                onChange={(e) => setMobilityType(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>설명</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="시리즈 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formBrand">
              <Form.Label>브랜드 선택</Form.Label>
              <Form.Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                required
              >
                <option value="">브랜드를 선택하세요</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          추가
        </Button>
        <Button variant="secondary" onClick={handleCancel} className="ms-2">
          취소
        </Button>
      </Form>
    </Container>
  );
};

export default AddSeries;
