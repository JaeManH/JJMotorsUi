import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import CarList from "../components/Car/CarList";
import { sedans, suvs, trucks } from "../test/TestData";

const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filterCars = (cars) => {
    return cars.filter((car) => car.name.toLowerCase().includes(searchQuery));
  };

  return (
    <div className="main-page">
      <SearchBar onSearch={handleSearch} />
      <div className="container mt-5">
        <CarList title="Sedans" cars={filterCars(sedans)} />
        <CarList title="SUVs" cars={filterCars(suvs)} />
        <CarList title="Trucks" cars={filterCars(trucks)} />
      </div>
    </div>
  );
};

export default Main;
