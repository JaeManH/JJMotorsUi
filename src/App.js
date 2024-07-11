import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ChatBot from "./components/Chatbot/ChatBot";
import AppRoutes from "./routes/AppRoutes"; // 수정된 경로
import RemoteControlBox from "./components/RemoteControlBox";
import ContactModal from "./components/Contact/ContactModal";
import { useState } from "react";
import PurchaseModal from "./components/PurchaseModal";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";

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
          <div className="mt-5 pt-4">
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
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
