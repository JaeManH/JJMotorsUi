import React, { useState, useEffect } from "react";
import axios from "axios";
import CarList from "../components/car/CarList";

const MainPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // 최근 자동차 정보 가져오기
    const fetchRecentCars = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/models`, {
          params: {
            page: 0,
            size: 5,
          },
        });
        setCars(response.data.content); // API 응답의 내용 중 자동차 리스트 설정
      } catch (err) {
        setError("자동차 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCars();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
      <div className="main-page">
        <div className="container mt-5">
          <CarList title="최신 자동차" cars={cars} />
        </div>
      </div>
  );
};

export default MainPage;
