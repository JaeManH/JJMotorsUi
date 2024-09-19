import React, { useState } from "react";
import Navbar from "./Components/Common/NavBar";
import Footer from "./Components/Common/Footer";
import AppRoutes from "./Routes/AppRoutes";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/Store";
import "./App.css";
import "./i18n"; // i18n 초기화 파일 가져오기

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

  let isAuthenticate = useSelector((state) => state.isAuthenticate);

  return (
    <Provider store={store}>
      <div className="overlay"></div>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Navbar />
          <div className="content">
            <div className="content-container">
              <AppRoutes />
            </div>
          </div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
