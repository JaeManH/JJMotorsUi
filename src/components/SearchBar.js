import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("click search");
    // onSearch(query);
  };

  return (
    <SearchBarContainer>
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
