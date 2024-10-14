import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // i18n 훅 추가
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLayout.css"; // CSS 파일

const AdminLayout = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
      <div className="admin-layout">
        <Container fluid>
          <Row>
            <Col xs={12} md={3} lg={2} className="sidebar bg-light p-3">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin/dashboard">
                  {t('sidebar.dashboard')}
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/manufacturer">
                  {t('sidebar.manufacturerManagement')}
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/brand">
                  {t('sidebar.brandManagement')}
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/series">
                  {t('sidebar.seriesManagement')}
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/model">
                  {t('sidebar.modelManagement')}
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/buyer">
                  {t('sidebar.buyerList')}
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
