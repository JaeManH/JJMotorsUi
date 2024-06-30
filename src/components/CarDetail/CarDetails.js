import React from "react";
import PropTypes from "prop-types";
import { Card, ListGroup, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CarDetails = ({ car }) => {
  return (
    <Card className="car-details-card">
      <Card.Img
        variant="top"
        src={car.image}
        alt={`${car.brand} ${car.model} image`}
      />
      <Card.Body>
        <Card.Title>{`${car.brand} ${car.model} (${car.year})`}</Card.Title>
        <Card.Text>
          <strong>Price: </strong>${car.minPrice.toLocaleString()} - $
          {car.maxPrice.toLocaleString()}
        </Card.Text>
        <Card.Text>
          <strong>Mileage: </strong>
          {car.minMileage.toLocaleString()} km -{" "}
          {car.maxMileage.toLocaleString()} km
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Status: </strong>
          <Badge bg="info">{car.status}</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Type: </strong>
          {car.type}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Fuel Type: </strong>
          {car.fuelType}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Transmission: </strong>
          {car.transmission}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Drivetrain: </strong>
          {car.drivetrain}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Exterior Color: </strong>
          {car.exteriorColor}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Interior Color: </strong>
          {car.interiorColor}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Options: </strong>
          <ul>
            {car.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Location: </strong>
          {car.location}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Seller Type: </strong>
          {car.sellerType}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Accident History: </strong>
          {car.accidentHistory ? "Yes" : "No"}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Maintenance Records: </strong>
          {car.maintenanceRecords ? "Available" : "Not Available"}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

CarDetails.propTypes = {
  car: PropTypes.shape({
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    minMileage: PropTypes.number,
    maxMileage: PropTypes.number,
    status: PropTypes.oneOf(["New", "Used", "Exhibited"]).isRequired,
    type: PropTypes.oneOf([
      "Sedan",
      "SUV",
      "Truck",
      "Coupe",
      "Convertible",
      "Hatchback",
      "Van",
      "Wagon",
    ]).isRequired,
    fuelType: PropTypes.oneOf([
      "Gasoline",
      "Diesel",
      "Hybrid",
      "Electric",
      "Hydrogen",
    ]).isRequired,
    transmission: PropTypes.oneOf(["Automatic", "Manual", "CVT"]).isRequired,
    drivetrain: PropTypes.oneOf(["FWD", "RWD", "AWD", "4WD"]).isRequired,
    exteriorColor: PropTypes.string.isRequired,
    interiorColor: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string.isRequired,
    sellerType: PropTypes.oneOf(["Individual", "Dealer"]).isRequired,
    accidentHistory: PropTypes.bool.isRequired,
    maintenanceRecords: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CarDetails;
