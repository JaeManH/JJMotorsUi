import React from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";

const CarInfoCard = ({ car }) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col md={4}>
          <Image src={car.mainImage} alt={car.title} fluid />
          <div className="d-flex justify-content-center mt-2">
            {car.thumbnails.map((thumb, index) => (
              <Image
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="me-1"
                style={{ width: "20%", cursor: "pointer" }}
              />
            ))}
          </div>
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{car.title}</Card.Title>
            <Card.Text>
              <strong>Reg. Year: </strong>
              {car.regYear}
              <br />
              <strong>Mileage: </strong>
              {car.mileage} km
              <br />
              <strong>Fuel: </strong>
              {car.fuel}
              <br />
              <strong>Engine: </strong>
              {car.engine}
              <br />
              <strong>Transmission: </strong>
              {car.transmission}
              <br />
              <strong>Model Year: </strong>
              {car.modelYear}
              <br />
              <strong>Exterior Color: </strong>
              {car.color}
              <br />
              <strong>Steering: </strong>
              {car.steering}
              <br />
              <strong>Body Type: </strong>
              {car.bodyType}
              <br />
              <strong>Drivetrain: </strong>
              {car.drivetrain}
              <br />
              <strong>Seats: </strong>
              {car.seats}
              <br />
              <strong>Doors: </strong>
              {car.doors}
            </Card.Text>
            <Button variant="primary" href={car.link}>
              Inquire Now
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CarInfoCard;
