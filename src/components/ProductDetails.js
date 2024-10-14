import React from "react";
import { useParams } from "react-router-dom";
import { sedans, suvs, trucks } from "../test/TestData";

const carData = {
  sedans,
  suvs,
  trucks,
};

const ProductDetails = () => {
  const { category, id } = useParams();
  const car = carData[category].find((car) => car.id === parseInt(id));

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="product-details">
      <h1>{car.name}</h1>
      <img src={car.image} alt={car.name} />
      <p>
        <strong>Price:</strong> {car.price}
      </p>
      <p>
        <strong>Model Year:</strong> {car.year}
      </p>
      <p>
        <strong>Mileage:</strong> {car.mileage}
      </p>
      <p>
        <strong>Color:</strong> {car.color}
      </p>
      <p>
        <strong>Fuel Type:</strong> {car.fuelType}
      </p>
      <p>
        <strong>Transmission:</strong> {car.transmission}
      </p>
      <p>
        <strong>Drivetrain:</strong> {car.drivetrain}
      </p>
      <p>
        <strong>Description:</strong> {car.description}
      </p>
    </div>
  );
};

export default ProductDetails;
