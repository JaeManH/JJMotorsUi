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
              <Card.Title>제조사 관리</Card.Title>
              <Card.Text>제조사를 관리 또는 추가합니다.</Card.Text>
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
              <Card.Title>브랜드 관리</Card.Title>
              <Card.Text>브랜드를 관리 또는 추가합니다.</Card.Text>
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
              <Card.Title>시리즈 관리</Card.Title>
              <Card.Text>시리즈를 관리 또는 추가합니다.</Card.Text>
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
              <Card.Title>모델 관리</Card.Title>
              <Card.Text>모델을 관리 또는 추가합니다.</Card.Text>
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
