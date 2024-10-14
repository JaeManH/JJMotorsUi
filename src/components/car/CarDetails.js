// components/ModelDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const carData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sedan 1",
    mileage: 10000,
    year: 2018,
    price: 10000,
    discountPrice: 9000,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sedan 2",
    mileage: 20000,
    year: 2019,
    price: 12000,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sedan 3",
    mileage: 30000,
    year: 2020,
    price: 14000,
    discountPrice: 13000,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sedan 4",
    mileage: 40000,
    year: 2021,
    price: 16000,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sedan 5",
    mileage: 50000,
    year: 2022,
    price: 18000,
    discountPrice: 17000,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "SUV 1",
    mileage: 15000,
    year: 2018,
    price: 20000,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "SUV 2",
    mileage: 25000,
    year: 2019,
    price: 22000,
    discountPrice: 21000,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "SUV 3",
    mileage: 35000,
    year: 2020,
    price: 24000,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "SUV 4",
    mileage: 45000,
    year: 2021,
    price: 26000,
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "SUV 5",
    mileage: 55000,
    year: 2022,
    price: 28000,
    discountPrice: 27000,
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Truck 1",
    mileage: 20000,
    year: 2018,
    price: 30000,
    discountPrice: 29000,
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Truck 2",
    mileage: 30000,
    year: 2019,
    price: 32000,
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Truck 3",
    mileage: 40000,
    year: 2020,
    price: 34000,
    discountPrice: 33000,
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Truck 4",
    mileage: 50000,
    year: 2021,
    price: 36000,
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Truck 5",
    mileage: 60000,
    year: 2022,
    price: 38000,
  },
];

const CarDetail = () => {
  const { id } = useParams();
  const car = carData.find((car) => car.id === parseInt(id));

  if (!car) {
    return <p>Car not found</p>;
  }

  const originalPrice = car.price;
  const discountedPrice = car.discountPrice;
  const discountAmount =
    originalPrice && discountedPrice ? originalPrice - discountedPrice : 0;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={car.image} alt={car.name} fluid />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{car.name}</Card.Title>
              <Card.Text>{car.mileage} km</Card.Text>
              <Card.Text>{car.year}</Card.Text>
              {discountedPrice ? (
                <>
                  <Card.Text
                    className="text-muted"
                    style={{ textDecoration: "line-through" }}
                  >
                    {originalPrice}
                  </Card.Text>
                  <Card.Text className="text-success">
                    {discountedPrice}
                  </Card.Text>
                  <Card.Text className="text-danger">
                    ({discountAmount} 할인)
                  </Card.Text>
                </>
              ) : (
                <Card.Text>{originalPrice}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetail;
