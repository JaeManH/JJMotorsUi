import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./../pages/Main";
import CarInfoCard from "../components/Car/CarInfoCard";
import CarDetails from "../components/Car/CarDetails";
import NotFound404 from "../pages/NotFound404";
import ProductPage from "../pages/ProductPage";
import CarCategoryPage from "../pages/CarCategoryPage";
import QnA from "../components/QnA/QnA";
import ProductDetails from "../components/ProductDetails"; // 새로운 컴포넌트 임포트
import ContactForm from "../components/Contact/ContactForm"; // ContactForm 임포트
import CarDetail from "../components/Car/CarDetail";
import CarDetailExample from "../components/Car/CarDetailExample"; // CarDetailExample 컴포넌트 임포트'
import CarUploadPage from "../pages/CarUploadPage";

const AppRoutes = () => {
  let testCarImage =
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let productSample = ["a", "b", "c", "d", "e"];

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

  <style type="text/css">
    {`
    .nav-tabs .nav-link {
      color: #495057;
      background-color: #e9ecef;
      border: 1px solid #dee2e6;
    }
    .nav-tabs .nav-link.active {
      color: #495057;
      background-color: #fff;
      border-color: #dee2e6 #dee2e6 #fff;
    }
  `}
  </style>;

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/purchase" element={<CarInfoCard car={carData} />} />
        <Route path="/sale" element={<div>판매</div>} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/category/:category" element={<CarCategoryPage />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/product/:category/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route
          path="/car/example"
          element={<CarDetailExample></CarDetailExample>}
        ></Route>
        <Route path="/carUpload" element={<CarUploadPage />}></Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
