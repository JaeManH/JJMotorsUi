import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill 에디터의 기본 스타일
import { Form, Button, Container, Row, Col } from "react-bootstrap"; // React Bootstrap 사용
import styles from './PostCreate.module.css'; // CSS Modules 파일 임포트
import { useSelector } from "react-redux"; // Redux에서 로그인된 사용자 정보 가져오기

const PostCreate = () => {
    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 에디터 내용 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
    const userId = 4; //useSelector((state) => state.auth.user.id); // Redux에서 로그인된 사용자 ID 가져옴
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            content,
        };

        try {
            // POST 요청을 보낼 때 userId를 @RequestParam으로 전달
            const response = await axios.post(`${apiUrl}/api/posts?userId=${userId}`, postData);
            if (response.status === 200) {
                alert("Post created successfully!");
                navigate("/posts"); // 글 작성 후 게시글 목록으로 이동
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <Container className={styles.formContainer}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1>Create a New Post</h1>
                    <Form onSubmit={handleSubmit}>
                        {/* 제목 입력 */}
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                                required
                                className={styles.titleInput}
                            />
                        </Form.Group>

                        {/* 에디터 */}
                        <Form.Group controlId="content" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                placeholder="Write your post content here..."
                                required
                                className={styles.reactQuill} /* 고정된 크기의 에디터 */
                            />
                        </Form.Group>

                        {/* 제출 버튼 */}
                        <Button variant="primary" type="submit" className="w-100">
                            Submit Post
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PostCreate;
