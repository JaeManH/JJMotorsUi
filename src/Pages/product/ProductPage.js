import React, {useEffect, useState} from "react";
import CarList from "../../components/car/CarList";
import SearchBar from "../../components/search-bar/SearchBar";
import Filter from "../../components/filter/Filter";
import { sedans, suvs, trucks } from "../../test/TestData";
import axios from "axios";

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
  });

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



  const handleMoreClick = (category) => {
    console.log(`More ${category} cars`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const filterCars = (cars) => {
    return cars.filter((car) => {
      return (
        car.name.toLowerCase().includes(searchQuery) &&
        (filters.minPrice === "" || car.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === "" || car.price <= parseInt(filters.maxPrice)) &&
        (filters.minYear === "" || car.year >= parseInt(filters.minYear)) &&
        (filters.maxYear === "" || car.year <= parseInt(filters.maxYear)) &&
        (filters.minMileage === "" ||
          car.mileage >= parseInt(filters.minMileage)) &&
        (filters.maxMileage === "" ||
          car.mileage <= parseInt(filters.maxMileage))
      );
    });
  };

  return (
    <div className="product-page">
      {/*<SearchBar onSearch={handleSearch} />*/}
      {/*<Filter onFilter={handleFilter} />*/}
      <CarList title="최근 제품" cars={cars} category="제품" />
      {/*<CarList title="SUVs" cars={filterCars(suvs)} category="suvs" />*/}
      {/*<CarList title="Trucks" cars={filterCars(trucks)} category="trucks" />*/}
    </div>
  );
}

export default ProductPage;
