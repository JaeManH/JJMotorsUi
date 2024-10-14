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
import { useTranslation } from "react-i18next"; // i18next 훅 사용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobe, faTachometerAlt } from "@fortawesome/free-solid-svg-icons"; // Font Awesome 아이콘
import {getDecodedToken} from "../../utils/jwtUtils"

function NavBar() {
  const { t, i18n } = useTranslation(); // i18next 훅 초기화
  let auth = useSelector((state) => state.auth); // 로그인 상태를 Redux에서 가져옴
  let dispatch = useDispatch();

  // 모달 상태 관리
  const [showLogin, setShowLogin] = useState(false);  // 로그인 모달 상태
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // 사용자 권한에서 ROLE_ADMIN이 있는지 확인
  const isAdmin = getDecodedToken()?.role?.includes("ADMIN");

  const handleLoginShow = () => setShowLogin(true);  // 로그인 모달 열기
  const handleLoginClose = () => setShowLogin(false);  // 로그인 모달 닫기

  const handleSignupShow = () => setShowSignup(true);  // 회원가입 모달 열기
  const handleSignupClose = () => setShowSignup(false);  // 회원가입 모달 닫기

  const handleForgotPasswordShow = () => setShowForgotPassword(true);  // 비밀번호 찾기 모달 열기
  const handleForgotPasswordClose = () => setShowForgotPassword(false);  // 비밀번호 찾기 모달 닫기

  const handleBackToLogin = () => {
    setShowSignup(false);
    setShowForgotPassword(false);
    setShowLogin(true);  // 회원가입이나 비밀번호 찾기에서 돌아갈 때 로그인 모달 열기
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/product">
                {t("navbar.product")}
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                {t("navbar.contact")}
              </Nav.Link>
              <Nav.Link as={Link} to="/qna">
                {t("navbar.qna")}
              </Nav.Link>
              <Nav.Link as={Link} to="/posts">
                커뮤니티
              </Nav.Link>

              {/* 관리자 권한이 있을 경우 Admin Dashboard 링크 표시 */}
              {isAdmin && (
                  <Nav.Link as={Link} to="/admin/dashboard">
                    <FontAwesomeIcon icon={faTachometerAlt} /> Admin Dashboard
                  </Nav.Link>
              )}
            </Nav>
            <Nav className="ms-auto">
              {auth ? ( // 로그인 상태라면 로그아웃 버튼 표시
                  <Nav.Link onClick={handleLogout}>
                    <FontAwesomeIcon icon={faUser} /> {t("navbar.logout")}
                  </Nav.Link>
              ) : ( // 로그인 상태가 아니면 로그인 버튼 표시
                  <Nav.Link style={{ color: "white" }} onClick={handleLoginShow}>
                    <FontAwesomeIcon icon={faUser} /> {t("navbar.login")}
                  </Nav.Link>
              )}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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
