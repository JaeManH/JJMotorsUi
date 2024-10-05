import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
  Tab,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { FaStar, FaSearch } from "react-icons/fa";
import "./BuyerListPage.css";

const BuyerListPage = () => {
  const [buyers, setBuyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [activeCountry, setActiveCountry] = useState("All"); // 활성화된 탭의 국가
  const [countries, setCountries] = useState([]); // 국가 목록

  useEffect(() => {
    fetchCountries();
    fetchBuyers();
  }, [currentPage, activeCountry]); // currentPage와 activeCountry가 변경될 때마다 데이터를 다시 가져옴

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/countries", {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchBuyers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/buyers", {
        params: {
          country: activeCountry !== "All" ? activeCountry : "",
          page: currentPage,
          size: 10, // 페이지당 아이템 수
        },
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setBuyers(response.data.content || []);
      setTotalPages(response.data.totalPages || 0); // 전체 페이지 수 설정
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBuyers = buyers.filter(
    (buyer) =>
      (buyer.companyName &&
        buyer.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (buyer.country &&
        buyer.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCountrySelect = (country) => {
    setActiveCountry(country);
    setCurrentPage(0); // 국가 변경 시 첫 페이지로 이동
  };

  const handlePageJump = (e) => {
    e.preventDefault();
    const pageInput = parseInt(e.target.elements.pageInput.value, 10) - 1;
    if (pageInput >= 0 && pageInput < totalPages) {
      setCurrentPage(pageInput);
    }
  };

  // Pagination range 계산
  const getPaginationItems = () => {
    const totalPageItems = Math.min(totalPages, 10); // 최대 10개 페이지 버튼만 보여줌
    const startPage = Math.max(currentPage - Math.floor(totalPageItems / 2), 0);
    const endPage = Math.min(startPage + totalPageItems - 1, totalPages - 1);

    const paginationItems = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    return paginationItems;
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={12}>
          <h2>Buyer List</h2>
        </Col>
        {/* <Col md={4}>
          <Form inline className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by company or country"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mr-sm-2"
            />
            <Button variant="outline-primary">
              <FaSearch />
            </Button>
          </Form>
        </Col> */}
      </Row>

      <Tab.Container activeKey={activeCountry} onSelect={handleCountrySelect}>
        <Nav variant="tabs" className="custom-tabs">
          <Nav.Item>
            <Nav.Link eventKey="All">All</Nav.Link>
          </Nav.Item>
          {countries.map((country) => (
            <Nav.Item key={country}>
              <Nav.Link eventKey={country}>{country}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey={activeCountry}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Country</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuyers.length > 0 ? (
                  filteredBuyers.map((buyer) => (
                    <tr key={buyer.id}>
                      <td>{buyer.companyName || "N/A"}</td>
                      <td>{buyer.country || "N/A"}</td>
                      <td>{buyer.address || "N/A"}</td>
                      <td>{buyer.email || "N/A"}</td>
                      <td>{buyer.phoneNumber || "N/A"}</td>
                      <td>
                        {buyer.website ? (
                          <a href={buyer.website}>{buyer.website}</a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => toggleFavorite(buyer.id)}
                          className="p-0"
                          style={{
                            color: favorites.includes(buyer.id)
                              ? "gold"
                              : "gray",
                          }}
                        >
                          <FaStar />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No buyers found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Pagination className="mt-3">
        <Pagination.First onClick={() => handlePageChange(0)} />
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(currentPage - 10, 0))}
        />
        {getPaginationItems()}
        <Pagination.Next
          onClick={() =>
            handlePageChange(Math.min(currentPage + 10, totalPages - 1))
          }
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
      </Pagination>

      <Form
        inline
        onSubmit={handlePageJump}
        className="d-flex justify-content-center mt-3"
      >
        <Form.Control
          type="number"
          name="pageInput"
          min="1"
          max={totalPages}
          placeholder="Go to page"
          style={{
            width: "120px", // 폼의 너비 조정
            marginRight: "10px", // 폼 간의 여백 조정
          }}
        />
        <Button type="submit" variant="outline-primary">
          Go
        </Button>
      </Form>
    </Container>
  );
};

export default BuyerListPage;
