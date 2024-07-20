import React, { useState, useEffect } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import CarItem from "../components/Car/CarItem";
import { useParams, useSearchParams } from "react-router-dom";
import { sedans, suvs, trucks } from "../test/TestData";
import "./CarCategoryPage.css"; // 새로운 스타일링 파일 임포트

const carData = {
  sedans,
  suvs,
  trucks,
};

const CarCategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const carsPerPage = 20;
  const carsToShow = carData[category] || [];

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const displayedCars = carsToShow.slice(
    (page - 1) * carsPerPage,
    page * carsPerPage
  );

  return (
    <Container className="car-category-page">
      <h1 className="text-center mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <Row className="justify-content-center">
        {displayedCars.map((car, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CarItem car={car} />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Pagination>
            {Array.from(
              { length: Math.ceil(carsToShow.length / carsPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === page}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default CarCategoryPage;
