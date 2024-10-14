import React, { useState } from "react";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Approutes from "./routes/AppRoutes";
import { useSelector,useDispatch  } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor,login, logout } from "./store/Store";
import { useEffect } from 'react';
import "./App.css";
import "./i18n"; // i18n 초기화 파일 가져오기
import { checkTokenExpiration } from './utils/CheckTokenExpiration'; // 토큰 만료 유틸리티 함수 임포트

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  const handleContactClose = () => setShowContact(false);
  const handleContactShow = () => setShowContact(true);

  const handlePurchaseClose = () => setShowPurchase(false);
  const handlePurchaseShow = () => setShowPurchase(true);

  const handleContactClick = () => {
    handleContactShow();
  };
  const handlePurchaseClick = () => {
    handlePurchaseShow();
  };
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // 토큰이 있으면 로그인 상태로 설정
      dispatch(login(token));
    } else {
      // 토큰이 없으면 로그아웃 상태로 설정
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    // 앱 로드 시 토큰 만료 체크
    const token = localStorage.getItem('token');
    if (token) {
      checkTokenExpiration(token, dispatch);
    }
  }, [dispatch]);

  let isAuthenticate = useSelector((state) => state.isAuthenticate);

  return (
    <Provider store={store}>
      <div className="overlay"></div>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Navbar />
          <div className="content">
            <div className="content-container">
              <Approutes />
            </div>
          </div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
