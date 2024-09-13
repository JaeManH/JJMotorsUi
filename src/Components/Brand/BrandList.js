import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
  Pagination,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editBrandName, setEditBrandName] = useState("");
  const [editLogoUrl, setEditLogoUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage, setBrandsPerPage] = useState(10); // 기본값 10으로 설정
  const [totalPages, setTotalPages] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands(searchQuery); // 검색어를 반영한 fetch 호출
  }, [currentPage, brandsPerPage]); // currentPage와 brandsPerPage가 변경될 때마다 호출

  // 검색어를 반영하여 브랜드 데이터 가져오기
  const fetchBrands = async (query = "") => {
    try {
      const response = await axios.get("http://localhost:8080/api/brands", {
        params: {
          search: query, // 검색어 반영
          page: currentPage - 1, // 페이지는 0부터 시작
          size: brandsPerPage, // 페이지당 보여줄 브랜드 수 반영
        },
      });

      const brandData = response.data; // 실제 브랜드 데이터
      setBrands(brandData);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error("브랜드 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 검색어 변경 시 상태 업데이트
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색어 제출 시 실행
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
    fetchBrands(searchQuery); // 검색어로 브랜드 목록 검색
  };

  const handlePageSizeChange = (e) => {
    setBrandsPerPage(parseInt(e.target.value)); // 페이지당 브랜드 수 업데이트
    setCurrentPage(1); // 페이지 수 변경 시 1페이지로 이동
  };

  const handleEdit = (brand) => {
    setEditingId(brand.id);
    setEditBrandName(brand.brandName);
    setEditLogoUrl(brand.logoUrl);
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedBrand = {
        brandName: editBrandName,
        logoUrl: editLogoUrl,
      };

      await axios.put(`http://localhost:8080/api/brands/${id}`, updatedBrand);
      fetchBrands(searchQuery); // 수정 후 검색어 유지하면서 목록 갱신
      setEditingId(null);
    } catch (error) {
      console.error("브랜드 수정 중 오류가 발생했습니다:", error);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedForDeletion.length === 0) {
      alert("삭제할 브랜드를 선택하세요.");
      return;
    }

    try {
      await axios({
        method: "delete",
        url: "http://localhost:8080/api/brands",
        data: selectedForDeletion, // 삭제할 브랜드 ID 리스트를 배열로 직접 전달
      });
      fetchBrands(searchQuery); // 삭제 후 검색어 유지하면서 목록 갱신
      setSelectedForDeletion([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("브랜드 삭제 중 오류가 발생했습니다:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedForDeletion.includes(id)) {
      setSelectedForDeletion(selectedForDeletion.filter((item) => item !== id));
    } else {
      setSelectedForDeletion([...selectedForDeletion, id]);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">브랜드 관리</h1>
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="브랜드 검색"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="primary" type="submit">
                검색
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col xs="auto">
          <Form.Select value={brandsPerPage} onChange={handlePageSizeChange}>
            <option value="5">5개</option>
            <option value="10">10개</option> {/* 기본값 10개 */}
            <option value="20">20개</option>
            <option value="30">30개</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            className="me-2"
            onClick={() => navigate("/admin/add-brand")}
          >
            추가
          </Button>
          <Button variant="danger" onClick={handleDeleteSelected}>
            삭제
          </Button>
        </Col>
      </Row>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: "15%" }}>로고</th>
            <th style={{ width: "20%" }}>브랜드 이름</th>
            <th style={{ width: "20%" }}>제조사</th>
            <th style={{ width: "10%" }}>생성자</th>
            <th style={{ width: "10%" }}>생성일</th>
            <th style={{ width: "10%" }}>수정</th>
            <th style={{ width: "15%" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {brands && brands.length > 0 ? (
            brands.map((brand) => (
              <tr key={brand.id}>
                <td className="align-middle">
                  {editingId === brand.id ? (
                    <Form.Control
                      type="text"
                      value={editLogoUrl}
                      onChange={(e) => setEditLogoUrl(e.target.value)}
                      style={{ width: "100px" }}
                    />
                  ) : (
                    <img
                      src={brand.logoUrl}
                      alt={brand.brandName}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td className="align-middle">
                  {editingId === brand.id ? (
                    <Form.Control
                      type="text"
                      value={editBrandName}
                      onChange={(e) => setEditBrandName(e.target.value)}
                    />
                  ) : (
                    brand.brandName
                  )}
                </td>
                <td className="align-middle">{brand.manufacturerName}</td>
                <td className="align-middle">{brand.createdBy}</td>
                <td className="align-middle">
                  {brand.createdDate
                    ? new Date(brand.createdDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="align-middle text-center">
                  {editingId === brand.id ? (
                    <Button
                      variant="primary"
                      onClick={() => handleSaveEdit(brand.id)}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button variant="warning" onClick={() => handleEdit(brand)}>
                      수정
                    </Button>
                  )}
                </td>
                <td className="align-middle text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedForDeletion.includes(brand.id)}
                    onChange={() => handleCheckboxChange(brand.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BrandList;
