import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ChatBot from "./components/Chatbot/ChatBot";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // 변수 저장소
  let testCarImage =
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  //여기서 부터 시작
  return (
    <div className="App">
      <ChatBot></ChatBot>

      <div className="header">
        <NavBar></NavBar>
      </div>

      <div className="container">
        <AppRoutes></AppRoutes>
      </div>
    </div>
  );
}

export default App;
