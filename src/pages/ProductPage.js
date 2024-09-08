import React, { useState } from "react";
import CarList from "../Components/Car/CarList";
import SearchBar from "../Components/SearchBar/SearchBar";
import Filter from "../Components/Filter/Filter";
import { sedans, suvs, trucks } from "../Test/TestData";

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
  });

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
      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <CarList title="Sedans" cars={filterCars(sedans)} category="sedans" />
      <CarList title="SUVs" cars={filterCars(suvs)} category="suvs" />
      <CarList title="Trucks" cars={filterCars(trucks)} category="trucks" />
    </div>
  );
}

export default ProductPage;
