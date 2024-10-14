import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login, setUser } from '../../store/Store'; // store에서 가져옴
import { useNavigate } from 'react-router-dom'; // React Router v6의 useNavigate 사용
import { toast } from 'react-toastify'; // toast import
import 'react-toastify/dist/ReactToastify.css'; // 토스트 스타일 적용

// base64url-safe 디코딩 함수
function decodeBase64Url(base64Url) {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

const LoginModal = ({
                        show,
                        handleClose,  // 모달 닫기 함수
                        handleSignupShow,
                        handleForgotPasswordShow
                    }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 모달이 열릴 때마다 입력 데이터 초기화
    useEffect(() => {
        if (show) {
            setEmail("");
            setPassword("");
            setErrorMessage("");
        }
    }, [show]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;

                // JWT 토큰 저장
                localStorage.setItem('token', token);

                // JWT 디코딩 후 사용자 정보 추출
                const decodedToken = JSON.parse(decodeBase64Url(token.split('.')[1]));
                const userData = {
                    name: decodedToken.name,
                    role: decodedToken.role,  // 사용자 권한 정보
                };

                // Redux 상태 업데이트 (로그인 및 권한 설정)
                dispatch(login(userData));
                dispatch(setUser(userData));

                // 로그인 성공 시 토스트 메시지 표시
                toast.success('로그인에 성공했습니다!');

                // 입력 필드 초기화
                setEmail("");
                setPassword("");

                // 모달 닫기
                handleClose();

                // 페이지 이동
                navigate('/');
            }
        } catch (error) {
            setErrorMessage('로그인에 실패했습니다.');
        }
    };

    const handleLinkedInLogin = () => {
        console.log("LinkedIn 로그인");
    };

    const handleGoogleLogin = () => {
        console.log("Google 로그인");
    };

    const handleWeChatLogin = () => {
        console.log("WeChat 로그인");
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        />
                    </Form.Group>
                    {errorMessage && (
                        <div className="text-danger mt-2">{errorMessage}</div>
                    )}
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                </Form>

                <hr />

                <div className="mt-3">
                    <Row className="mb-2">
                        <Col xs={12} className="mb-2">
                            <Button
                                variant="light"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={handleGoogleLogin}
                                style={{
                                    padding: "10px 0",
                                    backgroundColor: "#fff",
                                    borderColor: "#ddd",
                                }}
                            >
                                <img
                                    src="/images/web_light_sq_na@1x.png"
                                    alt="Google"
                                    style={{ height: "24px", marginRight: "8px" }}
                                />
                                <span style={{ fontSize: "16px", color: "#757575" }}>
                  Sign in with Google
                </span>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={6} className="pr-1">
                            <Button
                                variant="outline-primary"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={() => {
                                    console.log("Facebook 로그인");
                                }}
                                style={{ padding: "10px 0" }}
                            >
                                <img
                                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                                    alt="Facebook"
                                    style={{ width: "20px", marginRight: "8px" }}
                                />
                                Facebook
                            </Button>
                        </Col>
                        <Col xs={6} className="pl-1">
                            <Button
                                variant="outline-info"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={handleLinkedInLogin}
                                style={{ padding: "10px 0" }}
                            >
                                <img
                                    src="/images/LI-Logo.png"
                                    alt="LinkedIn Logo"
                                    style={{ height: "20px", marginRight: "8px" }}
                                />
                                LinkedIn
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button
                                variant="outline-success"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={handleWeChatLogin}
                                style={{ padding: "10px 0" }}
                            >
                                <img
                                    src="/images/wechat_login_icon.png"
                                    alt="WeChat"
                                    style={{ width: "20px", marginRight: "8px" }}
                                />
                                WeChat
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div className="mt-3 text-center">
                    <a
                        href="#signup"
                        onClick={() => {
                            handleClose();
                            handleSignupShow();
                        }}
                    >
                        Sign Up
                    </a>{" "}
                    |{" "}
                    <a
                        href="#forgot-password"
                        onClick={() => {
                            handleClose();
                            handleForgotPasswordShow();
                        }}
                    >
                        Forgot Password
                    </a>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
