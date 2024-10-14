import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PostDetail.module.css"; // 모듈 CSS 임포트

const PostDetail = () => {
    const { id } = useParams(); // URL에서 게시글 ID를 가져옴
    const [post, setPost] = useState(null); // 게시글 정보를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 게시글 상세 정보를 백엔드에서 가져오는 함수
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`); // 게시글 ID로 API 호출
                setPost(response.data); // 응답 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchPostDetail(); // 게시글 정보를 가져오는 함수 호출
    }, [id]); // 게시글 ID가 변경될 때마다 호출

    if (loading) {
        return <div className={styles.loading}>Loading...</div>; // 로딩 중일 때 표시
    }

    if (!post) {
        return <div className={styles.notFound}>Post not found</div>; // 게시글을 찾을 수 없을 때 표시
    }

    return (
        <div className={styles.postDetail}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.author}>By: {post.authorName}</p>
            {/* 본문을 HTML 형식으로 렌더링 */}
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <p className={styles.info}>
                {post.viewCount} views | {post.likeCount} likes
            </p>
        </div>
    );
};

export default PostDetail;
