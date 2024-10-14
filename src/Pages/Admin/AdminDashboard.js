import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // i18n 추가
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
      <Container className="mt-5">
        <h1 className="text-center mb-4">{t('adminDashboard.title')}</h1>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>{t('adminDashboard.manufacturerManagement')}</Card.Title>
                <Card.Text>{t('adminDashboard.manufacturerDescription')}</Card.Text>
                <Button
                    variant="primary"
                    onClick={() => handleNavigation("/admin/manufacturer")}
                >
                  {t('adminDashboard.go')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>{t('adminDashboard.brandManagement')}</Card.Title>
                <Card.Text>{t('adminDashboard.brandDescription')}</Card.Text>
                <Button
                    variant="primary"
                    onClick={() => handleNavigation("/admin/brand")}
                >
                  {t('adminDashboard.go')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>{t('adminDashboard.seriesManagement')}</Card.Title>
                <Card.Text>{t('adminDashboard.seriesDescription')}</Card.Text>
                <Button
                    variant="primary"
                    onClick={() => handleNavigation("/admin/series")}
                >
                  {t('adminDashboard.go')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>{t('adminDashboard.modelManagement')}</Card.Title>
                <Card.Text>{t('adminDashboard.modelDescription')}</Card.Text>
                <Button
                    variant="primary"
                    onClick={() => handleNavigation("/admin/model")}
                >
                  {t('adminDashboard.go')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>{t('adminDashboard.buyerList')}</Card.Title>
                <Card.Text>{t('adminDashboard.buyerDescription')}</Card.Text>
                <Button
                    variant="primary"
                    onClick={() => handleNavigation("/admin/buyer")}
                >
                  {t('adminDashboard.go')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default AdminDashboard;
