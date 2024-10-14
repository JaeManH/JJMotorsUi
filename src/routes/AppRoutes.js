import React from "react";
import {Routes, Route} from "react-router-dom";
import MainPage from "../pages/MainPage";
import CarInfoCard from "../components/car/CarInfoCard";
import NotFound404 from "../pages/404/NotFound404";
import ProductPage from "../pages/product/ProductPage";
import CarCategoryPage from "../pages/CarCategoryPage";
import QnA from "../components/qna/QnA";
import ProductDetails from "../components/ProductDetails";
import ContactForm from "../components/contact/ContactForm";
import MobilityModelUpload from "../components/model/MobilityModelUpload";
import MobilitySeriesUpload from "../pages/MobilitySeriesUpload";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../pages/admin/Layout/AdminLayout";
import MobilityModelDetail from "../components/car/MobilityModelDetail";
import ManufacturerList from "../components/manufacturer/ManufacturerList";
import AddManufacturer from "../components/manufacturer/AddManufacturer";
import BrandList from "../components/brand/BrandList";
import AddBrand from "../components/brand/AddBrand";
import SeriesList from "../components/series/SeriesList";
import AddSeries from "../components/series/AddSeries";
import MobilityModelList from "../components/model/MobilityModelList";
import BuyerListPage from "../components/buyer/BuyerListPage";
import RoleProtectedRoute from "./RoleProtectedRoute"; // 역할 기반 보호 라우트 임포트
import PostList from "../components/post/PostList";
import PostDetail from "../components/post/PostDetail"; // 게시글 상세보기 컴포넌트
import PostCreate from "../components/post/PostCreate"; // 글 작성

const AppRoutes = () => {

    const Roles = {
        ADMIN: 'ROLE_ADMIN',
        USER: 'ROLE_USER',
        GUEST: 'ROLE_GUEST',
    };

    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/purchase" element={<CarInfoCard/>}/>
            <Route path="/sale" element={<div>판매</div>}/>
            <Route path="/product" element={<ProductPage/>}/>
            <Route path="/category/:category" element={<CarCategoryPage/>}/>
            <Route path="/qna" element={<QnA/>}/>
            <Route path="/product/:category/:id" element={<ProductDetails/>}/>
            <Route path="/contact" element={<ContactForm/>}/>
            <Route path="/mobilityModel/:id" element={<MobilityModelDetail/>}/>
            <Route path="/mobilityModelUpload" element={<MobilityModelUpload/>}/>
            <Route path="/mobilitySeriesUpload" element={<MobilitySeriesUpload/>}/>
            <Route path="/posts" element={<PostList />} /> {/* 게시글 목록 */}
            <Route path="/posts/:id" element={<PostDetail />} /> {/* 게시글 상세 */}
            <Route path="/post-create" element={<PostCreate />} /> {/* 글 작성 */}

            {/* 관리자 권한이 필요한 라우트 */}
            <Route
                path="/admin"
                element={<RoleProtectedRoute element={<AdminLayout />} requiredRole={Roles.ADMIN} />}
            >
                {/* 관리자 전용 하위 라우트 */}
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manufacturer" element={<ManufacturerList />} />
                <Route path="add-manufacturer" element={<AddManufacturer />} />
                <Route path="brand" element={<BrandList />} />
                <Route path="add-brand" element={<AddBrand />} />
                <Route path="series" element={<SeriesList />} />
                <Route path="add-series" element={<AddSeries />} />
                <Route path="model" element={<MobilityModelList />} />
                <Route path="add-model" element={<MobilityModelUpload />} />
                <Route path="edit-model/:id" element={<MobilityModelUpload />} />
                <Route path="buyer" element={<BuyerListPage />} />
            </Route>


            {/* 404 페이지 */}
            <Route path="*" element={<NotFound404/>} />
        </Routes>
    );
};

export default AppRoutes;
