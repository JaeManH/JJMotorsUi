import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import LoginModal from "../user/LoginModal";
import SignupModal from "../user/SignupModal";
import ForgotPasswordModal from "../user/ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobe, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { getDecodedToken } from "../../utils/jwtUtils";
import styles from './NavBar.module.css';  // CSS 모듈 import

function NavBar() {
  const { t, i18n } = useTranslation();
  let auth = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const isAdmin = getDecodedToken()?.role?.includes("ADMIN");

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  const handleSignupShow = () => setShowSignup(true);
  const handleSignupClose = () => setShowSignup(false);

  const handleForgotPasswordShow = () => setShowForgotPassword(true);
  const handleForgotPasswordClose = () => setShowForgotPassword(false);

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
      <Navbar expand="lg" fixed="top" className={styles.navbar}>
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
            {t("navbar.brand")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggler}>
            <span className={styles.navbarTogglerIcon}></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/product" className={styles.navLink}>
                {t("navbar.product")}
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className={styles.navLink}>
                {t("navbar.contact")}
              </Nav.Link>
              <Nav.Link as={Link} to="/qna" className={styles.navLink}>
                {t("navbar.qna")}
              </Nav.Link>
              <Nav.Link as={Link} to="/posts" className={styles.navLink}>
                {t("navbar.community")}
              </Nav.Link>

              {isAdmin && (
                  <Nav.Link as={Link} to="/admin/dashboard" className={styles.navLink}>
                    <FontAwesomeIcon icon={faTachometerAlt} /> Admin Dashboard
                  </Nav.Link>
              )}
            </Nav>
            <Nav className="ms-auto">
              {auth ? (
                  <Nav.Link onClick={handleLogout} className={styles.navLink}>
                    <FontAwesomeIcon icon={faUser} /> {t("navbar.logout")}
                  </Nav.Link>
              ) : (
                  <Nav.Link style={{ color: "white" }} onClick={handleLoginShow} className={styles.navLink}>
                    <FontAwesomeIcon icon={faUser} /> {t("navbar.login")}
                  </Nav.Link>
              )}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={styles.navLink}>
                  <FontAwesomeIcon icon={faGlobe} /> {t("navbar.language")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage("en")}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("ko")}>한국어</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("cn")}>简体中文</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* 로그인 모달 */}
        <LoginModal
            show={showLogin}  // showLogin 상태로 모달을 열고 닫음
            handleClose={handleLoginClose}
            handleSignupShow={handleSignupShow}
            handleForgotPasswordShow={handleForgotPasswordShow}
        />
        {/* 회원가입 모달 */}
        <SignupModal
            show={showSignup}
            handleClose={handleSignupClose}
            handleBack={handleBackToLogin}
        />
        {/* 비밀번호 찾기 모달 */}
        <ForgotPasswordModal
            show={showForgotPassword}
            handleClose={handleForgotPasswordClose}
            handleBack={handleBackToLogin}
        />
      </Navbar>
  );
}

export default NavBar;
