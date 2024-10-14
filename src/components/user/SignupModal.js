import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import Flag from "react-world-flags";
import { FaSearch } from "react-icons/fa"; // 돋보기 아이콘 추가
import { countries } from "./countryData"; // 각국 이름과 코드, 국기 정보
import axios from "axios"; // axios 추가

const SignupModal = ({ show, handleClose, handleBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태 관리
  const [error, setError] = useState(null); // 에러 처리 상태

  // 자동완성 해제
  const autoCompleteOff = { autoComplete: "off" };
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      console.log(selectedCountry?.label);
      // 백엔드 회원가입 API 요청
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name: name,
        email: email,
        password: password,
        country: selectedCountry?.value,
      });

      // 회원가입 성공 후 처리
      if (response.status === 200) {
        alert("User registered successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedCountry(null);
        handleClose(); // 모달 닫기
      }
    } catch (err) {
      setError(err.response?.data || "Signup failed, please try again.");
    }
  };

  // 국가 옵션 커스터마이징 (국가명, 국기 표시)
  const customOption = (props) => {
    const { label, value, flag } = props.data;
    return (
        <div
            ref={props.innerRef}
            {...props.innerProps}
            className={`d-flex align-items-center p-2 ${
                props.isFocused ? "bg-light" : ""
            }`}
            style={{
              cursor: "pointer",
            }}
        >
          <Flag code={flag} style={{ width: "24px", marginRight: "10px" }} />
          <span>
          {label} ({value})
        </span>
        </div>
    );
  };

  // 선택된 국가 표시 커스터마이징 (국기와 함께)
  const customSingleValue = (props) => {
    const { label, flag } = props.data;
    return (
        <div className="d-flex align-items-center">
          <Flag code={flag} style={{ width: "24px", marginRight: "10px" }} />
          <span>{label}</span>
        </div>
    );
  };

  // 검색 가능성을 알리기 위한 placeholder와 아이콘 추가
  const customPlaceholder = () => (
      <div className="d-flex align-items-center">
        <FaSearch style={{ marginRight: "8px" }} /> {/* 돋보기 아이콘 추가 */}
        <span>Search country...</span>
      </div>
  );

  const handleMenuOpen = () => {
    setIsMenuOpen(true); // 메뉴를 열 때 검색창을 활성화
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false); // 메뉴를 닫을 때 검색창을 비활성화
  };

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  {...autoCompleteOff} // 자동완성 해제
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  {...autoCompleteOff} // 자동완성 해제
              />
            </Form.Group>
            <Form.Group controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Select
                  options={countries} // 국가 리스트 옵션
                  value={selectedCountry} // 선택된 국가 상태
                  onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                  onMenuOpen={handleMenuOpen} // 메뉴 열림 시
                  onMenuClose={handleMenuClose} // 메뉴 닫힘 시
                  placeholder={customPlaceholder()} // 커스텀 placeholder로 검색 가능성 알림
                  components={{
                    Option: customOption, // 커스텀 옵션 (국가명, 국기)
                    SingleValue: customSingleValue, // 선택된 값도 국기와 함께 표시
                  }}
                  menuIsOpen={isMenuOpen} // 메뉴 열림 상태를 제어
                  required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  {...autoCompleteOff} // 자동완성 해제
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  {...autoCompleteOff} // 자동완성 해제
              />
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          <Button variant="secondary" onClick={handleBack} className="mt-3">
            Back to Login
          </Button>
        </Modal.Body>
      </Modal>
  );
};

export default SignupModal;
