import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
// import NotFoundPage from "../pages/NotFoundPage";
import MainPage from "./../pages/Main";
import CarInfoCard from "./../components/CarInfoCard";
import CarDetails from "./../components/CarDetail/CarDetails";

const AppRoutes = () => {
  let productSample = ["a", "b", "c", "d", "e"];
  let testCarImage =
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const car = {
    image: testCarImage,
    brand: "Hyundai",
    model: "Sonata",
    year: 2020,
    minPrice: 20000,
    maxPrice: 25000,
    minMileage: 10000,
    maxMileage: 50000,
    status: "Used",
    type: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    drivetrain: "FWD",
    exteriorColor: "Black",
    interiorColor: "Beige",
    options: [
      "Navigation",
      "Sunroof",
      "Leather Seats",
      "Heated Seats",
      "Rear Camera",
      "Automatic Parking",
      "Adaptive Cruise Control",
      "Safety Systems",
    ],
    location: "Seoul, South Korea",
    sellerType: "Dealer",
    accidentHistory: false,
    maintenanceRecords: true,
  };
  const carData = {
    mainImage: testCarImage,
    thumbnails: [testCarImage, testCarImage, testCarImage],
    title: "2018 CHANGAN OSHAN X70A 1.5L 107HP L4 5MT",
    price: "FOB:$4,756",
    modelYear: "2018",
    color: "White",
    steering: "Left",
    bodyType: "SUV",
    engine: "1.5L 107HP L4",
    drivetrain: "2WD",
    seats: "7",
    doors: "5",
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route
          path="/purchase"
          element={
            <>
              <CarInfoCard car={carData} />
            </>
          }
        ></Route>
        <Route path="/sale" element={<div>판매</div>}></Route>

        <Route
          path="/test"
          element={<CarDetails car={car}></CarDetails>}
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
