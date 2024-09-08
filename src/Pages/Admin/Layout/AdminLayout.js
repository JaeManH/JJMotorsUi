import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLayout.css"; // 새로 만든 CSS 파일 임포트

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/admin/dashboard">관리자 패널</Navbar.Brand>
          <Nav className="ml-auto">
            <Button variant="outline-light">로그아웃</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="sidebar bg-light p-3">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/admin/dashboard">
                대시보드
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/manufacturer">
                제조사 관리
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/brand">
                브랜드 관리
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/series">
                시리즈 관리
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/model">
                모델 관리
              </Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} md={9} lg={10} className="main-content p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout;
