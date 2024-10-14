// src/utils/checkTokenExpiration.js

import { logout } from '../store/Store'; // Redux에서 로그아웃 액션 임포트

export const checkTokenExpiration = (token, dispatch) => {
    if (!token) return;

    try {
        // JWT 토큰 디코딩
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
        const currentTime = Date.now();

        if (currentTime > expirationTime) {
            // 토큰이 만료되었으면 로그아웃 처리
            dispatch(logout());
            localStorage.removeItem('token');
            console.log('토큰 만료로 인해 로그아웃되었습니다.');
        }
    } catch (error) {
        console.error('토큰 디코딩 중 오류가 발생했습니다:', error);
    }
};
