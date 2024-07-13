import React from "react";
import NavBar from "./components/NavBar/NavBar";
import ChatBot from "./components/Chatbot/ChatBot";
import AppRoutes from "./routes/AppRoutes";
import RemoteControlBox from "./components/RemoteControlBox/RemoteControlBox";
import ContactModal from "./components/Contact/ContactModal";
import PurchaseModal from "./components/PurchaseModal/PurchaseModal";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store"; // 경로 수정
import "./App.css";

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

  let isAthenticate = useSelector((state) => state.isAthenticate);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <NavBar />
          <div className="content mt-5 pt-4">
            <RemoteControlBox
              onContactClick={handleContactClick}
              onPurchaseClick={handlePurchaseClick}
            />
            <ContactModal
              show={showContact}
              handleClose={handleContactClose}
              user={user}
            />
            <PurchaseModal
              show={showPurchase}
              handleClose={handlePurchaseClose}
            />
            <ChatBot />
            <div className="container">
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
