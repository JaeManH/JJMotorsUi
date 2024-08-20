import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import "./App.css";
import "./i18n"; // i18n 초기화 파일 가져오기

function App() {
  const [showContact, setShowContact] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  const handleContactClose = () => setShowContact(false);
  const handleContactShow = () => setShowContact(true);

  const handlePurchaseClose = () => setShowPurchase(false);
  const handlePurchaseShow = () => setShowPurchase(true);

  const [user, setUser] = useState(null);

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
          <NavBar />
          <div className="content mt-5 pt-4">
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
