import axios from 'axios';
import { checkTokenExpiration } from '../utils/CheckTokenExpiration'; // 토큰 만료 유틸리티 함수 임포트
import {store} from '../store/Store.js'; // Redux 스토어

// Axios 인스턴스 생성
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // 요청 전에 토큰 만료 여부 확인
            checkTokenExpiration(token, store.dispatch);
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
