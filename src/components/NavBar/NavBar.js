import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import LoginModal from "../User/LoginModal";
import SignupModal from "../User/SignupModal";
import ForgotPasswordModal from "../User/ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/store";
import { Link } from "react-router-dom";

function NavBar() {
  let store = useSelector((state) => state);
  let dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  const handleForgotPasswordClose = () => setShowForgotPassword(false);
  const handleForgotPasswordShow = () => setShowForgotPassword(true);

  const handleBackToLogin = () => {
    setShowSignup(false);
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          KS Motors
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/product">
              제품
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              검색
            </Nav.Link>
            <Nav.Link as={Link} to="/howtobuy">
              구매방법
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              문의하기
            </Nav.Link>
            <Nav.Link as={Link} to="/qna">
              QnA
            </Nav.Link>
          </Nav>
          {store.isAthenticate ? (
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          ) : (
            <Nav.Link style={{ fontColor: "white" }} onClick={handleLoginShow}>
              로그인
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
      <LoginModal
        show={showLogin}
        handleClose={handleLoginClose}
        handleSignupShow={handleSignupShow}
        handleForgotPasswordShow={handleForgotPasswordShow}
      />
      <SignupModal
        show={showSignup}
        handleClose={handleSignupClose}
        handleBack={handleBackToLogin}
      />
      <ForgotPasswordModal
        show={showForgotPassword}
        handleClose={handleForgotPasswordClose}
        handleBack={handleBackToLogin}
      />
    </Navbar>
  );
}

export default NavBar;
