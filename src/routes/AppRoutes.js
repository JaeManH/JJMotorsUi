import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../Pages/Main";
import CarInfoCard from "../Components/Car/CarInfoCard";
import NotFound404 from "../Pages/NotFound404";
import ProductPage from "../Pages/ProductPage";
import CarCategoryPage from "../Pages/CarCategoryPage";
import QnA from "../Components/QnA/QnA";
import ProductDetails from "../Components/ProductDetails"; // 새로운 컴포넌트 임포트
import ContactForm from "../Components/Contact/ContactForm"; // ContactForm 임포트
import CarDetailExample from "../Components/Car/CarDetailExample"; // CarDetailExample 컴포넌트 임포트'
import MobilityModelUpload from "../Pages/MobilityModelUpload";
import MobilitySeriesUpload from "../Pages/MobilitySeriesUpload";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminLayout from "../Pages/Admin/Layout/AdminLayout";
import MobilityModelDetail from "../Components/Car/MobilityModelDetail";
import ManufacturerList from "../Components/Manufacturer/ManufacturerList";
import AddManufacturer from "../Components/Manufacturer/AddManufacturer";

const AppRoutes = () => {
  let testCarImage =
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
        <Route path="/" element={<MainPage />} />
        <Route path="/purchase" element={<CarInfoCard car={carData} />} />
        <Route path="/sale" element={<div>판매</div>} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/category/:category" element={<CarCategoryPage />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/product/:category/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/MobilityModel/:id" element={<MobilityModelDetail />} />
        <Route
          path="/car/example"
          element={<CarDetailExample></CarDetailExample>}
        ></Route>
        <Route
          path="/mobilityModelUpload"
          element={<MobilityModelUpload />}
        ></Route>
        <Route
          path="/mobilitySeriesUpload"
          element={<MobilitySeriesUpload />}
        ></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manufacturer" element={<ManufacturerList />} />
          <Route path="add-manufacturer" element={<AddManufacturer />} />
          {/* <Route path="manufacturer" element={<ManufacturerPage />} />
          <Route path="brand" element={<BrandPage />} />
          <Route path="series" element={<SeriesPage />} />
          <Route path="model" element={<ModelPage />} /> */}
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
