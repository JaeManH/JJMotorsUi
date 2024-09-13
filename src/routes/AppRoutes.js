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
import BrandList from "../Components/Brand/BrandList";
import AddBrand from "../Components/Brand/AddBrand";
import SeriesList from "../Components/Series/SeriesList";
import AddSeries from "../Components/Series/AddSeries";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/purchase" element={<CarInfoCard />} />
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
          <Route path="brand" element={<BrandList />} />
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="series" element={<SeriesList />} />
          <Route path="add-series" element={<AddSeries />} />

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
