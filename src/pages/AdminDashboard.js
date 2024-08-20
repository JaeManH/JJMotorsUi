import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">관리자 대시보드</h1>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>제조사 등록</Card.Title>
              <Card.Text>새로운 제조사를 등록합니다.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/admin/manufacturer")}
              >
                이동
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>브랜드 등록</Card.Title>
              <Card.Text>새로운 브랜드를 등록합니다.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/admin/brand")}
              >
                이동
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>시리즈 등록</Card.Title>
              <Card.Text>새로운 시리즈를 등록합니다.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/admin/series")}
              >
                이동
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>모델 등록</Card.Title>
              <Card.Text>새로운 모델을 등록합니다.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/admin/model")}
              >
                이동
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
