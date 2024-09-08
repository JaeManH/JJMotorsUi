import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import LoginModal from "../User/LoginModal";
import SignupModal from "../User/SignupModal";
import ForgotPasswordModal from "../User/ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // i18next 훅 사용

function NavBar() {
  const { t, i18n } = useTranslation(); // i18next 훅 초기화
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t("navbar.brand")}
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
              {t("navbar.product")}
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/search">
              {t("navbar.search")}
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/howtobuy">
              {t("navbar.howtobuy")}
            </Nav.Link> */}
            <Nav.Link as={Link} to="/contact">
              {t("navbar.contact")}
            </Nav.Link>
            <Nav.Link as={Link} to="/qna">
              {t("navbar.qna")}
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {store.isAthenticate ? (
              <Nav.Link onClick={handleLogout}>{t("navbar.logout")}</Nav.Link>
            ) : (
              <Nav.Link style={{ color: "white" }} onClick={handleLoginShow}>
                {t("navbar.login")}
              </Nav.Link>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {t("navbar.language")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage("en")}>
                  English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("ko")}>
                  한국어
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
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
