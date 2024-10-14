import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "../components/user/LoginModal"; // 로그인 모달 임포트
import { getDecodedToken } from "../utils/jwtUtils";

// 역할 기반 보호 라우트
const RoleProtectedRoute = ({ element, requiredRole, ...rest }) => {
    const [showLoginModal, setShowLoginModal] = useState(false); // 모달 상태
    const auth = useSelector((state) => state.auth); // Redux에서 로그인 상태 가져오기
    const decodedToken = getDecodedToken();

    const handleLoginShow = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);

    // 권한 체크: 로그인 상태와 디코딩된 토큰의 역할 확인
    const hasRequiredRole = decodedToken && decodedToken.role === requiredRole;

    // 권한이 없으면 모달을 띄움
    useEffect(() => {
        if (!auth || !hasRequiredRole) {
            handleLoginShow(); // 권한이 없으면 모달을 띄움
        }
    }, [auth, hasRequiredRole]);

    // 권한이 있으면 컴포넌트를 렌더링
    if (auth && hasRequiredRole) {
        return element;
    }

    // 권한이 없으면 모달을 띄우고, 로그인 시도 후 권한 확인
    return (
        <>
            <LoginModal show={showLoginModal} handleClose={handleLoginClose} />
            {/* 권한이 없으면 페이지 이동 차단 */}
            {!auth && !showLoginModal && <Navigate to="/404" replace={false} />}
        </>
    );
};

export default RoleProtectedRoute;
