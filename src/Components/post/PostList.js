import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap"; // 페이지네이션을 위한 컴포넌트 추가
import styles from "./PostList.module.css"; // 스타일 파일 임포트

const PostList = () => {
    const [posts, setPosts] = useState([]); // 게시글 목록을 저장하는 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // 페이지에 맞는 게시글을 가져오는 함수
        const fetchPosts = async (page) => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/posts`, {
                    params: {
                        page: page,
                        size: 5, // 한 페이지당 5개의 게시글을 표시
                    },
                });
                setPosts(response.data.content); // 게시글 데이터를 상태에 저장
                setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchPosts(currentPage); // 컴포넌트가 마운트될 때 또는 페이지가 변경될 때 실행
    }, [currentPage, apiUrl]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 변경
    };

    if (loading) {
        return <div>Loading...</div>; // 데이터 로딩 중일 때 표시할 메시지
    }

    if (posts.length === 0) {
        return <div>No posts available</div>; // 게시글이 없을 때 표시할 메시지
    }

    return (
        <div className={styles.contentContainer}>
            <h1 className={`${styles.textCenter} ${styles.mb4}`}>Post List</h1>
            <ul className={styles.postList}>
                {posts.map((post) => (
                    <li key={post.id} className={styles.postItem}>
                        {/* 게시글 제목을 링크로 표시하며, 상세 페이지로 이동 */}
                        <Link to={`/posts/${post.id}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <p>By: {post.authorName}</p> {/* 작성자 이름 표시 */}
                        <p>
                            {post.viewCount} views | {post.likeCount} likes
                        </p>{" "}
                        {/* 조회수와 추천수 표시 */}
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            <Pagination className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index === currentPage}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default PostList;
