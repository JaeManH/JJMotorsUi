import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManufacturerList = () => {
  const navigate = useNavigate();
  const [manufacturers, setManufacturers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLogoUrl, setEditLogoUrl] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [manufacturersPerPage, setManufacturersPerPage] = useState(5); // 초기 페이지당 제조사 수를 5로 설정
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태 추가
  const [totalElements, setTotalElements] = useState(0); // 전체 항목 수 상태 추가

  useEffect(() => {
    fetchManufacturers();
  }, [currentPage, manufacturersPerPage]); // currentPage와 manufacturersPerPage가 변경될 때마다 데이터 fetch

  const fetchManufacturers = async (query = "") => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/manufacturers`,
        {
          params: {
            search: query,
            page: currentPage - 1, // Spring Data JPA는 0부터 시작하는 페이지 인덱스를 사용
            size: manufacturersPerPage,
          },
        }
      );
      setManufacturers(response.data.content); // content를 사용하여 실제 제조사 데이터를 설정
      setTotalPages(response.data.totalPages); // totalPages 설정
      setTotalElements(response.data.totalElements); // totalElements 설정
    } catch (error) {
      console.error("제조사 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleEdit = (manufacturer) => {
    setEditingId(manufacturer.id);
    setEditName(manufacturer.manufacturerName);
    setEditLogoUrl(manufacturer.logoUrl);
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedManufacturer = {
        manufacturerName: editName,
        logoUrl: editLogoUrl,
      };

      // PUT 요청을 통해 수정된 제조사 데이터를 서버에 전송
      await axios.put(
        `http://localhost:8080/api/manufacturers/${id}`,
        updatedManufacturer
      );

      // 수정 후 UI 업데이트
      setManufacturers(
        manufacturers.map((m) =>
          m.id === id
            ? { ...m, manufacturerName: editName, logoUrl: editLogoUrl }
            : m
        )
      );

      setEditingId(null); // 수정 모드 해제
    } catch (error) {
      console.error("제조사 수정 중 오류가 발생했습니다:", error);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("삭제 확인됨: ", selectedForDeletion);
    setShowDeleteModal(false);
    setSelectedForDeletion([]);
  };

  const handleCheckboxChange = (id) => {
    if (selectedForDeletion.includes(id)) {
      setSelectedForDeletion(selectedForDeletion.filter((item) => item !== id));
    } else {
      setSelectedForDeletion([...selectedForDeletion, id]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    fetchManufacturers(searchQuery);
  };

  const handlePageSizeChange = (event) => {
    setManufacturersPerPage(parseInt(event.target.value));
    setCurrentPage(1); // 페이지 수 변경 시 첫 페이지로 이동
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">제조사 관리</h1>
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="제조사 검색"
                aria-label="제조사 검색"
                aria-describedby="basic-addon2"
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
          <Form.Select
            value={manufacturersPerPage}
            onChange={handlePageSizeChange}
            className="mb-3"
          >
            <option value="5">5개</option>
            <option value="10">10개</option>
            <option value="20">20개</option>
            <option value="30">30개</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            className="me-2"
            onClick={() => navigate("/admin/add-manufacturer")}
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
            <th style={{ width: "10%" }}>로고</th>
            <th style={{ width: "20%" }}>제조사 이름</th>
            <th style={{ width: "15%" }}>국가</th>
            <th style={{ width: "15%" }}>생성자</th>
            <th style={{ width: "15%" }}>생성일</th>
            <th style={{ width: "10%" }}>수정</th>
            <th style={{ width: "15%" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => (
            <tr key={manufacturer.id}>
              <td>
                {editingId === manufacturer.id ? (
                  <Form.Control
                    type="text"
                    value={editLogoUrl}
                    onChange={(e) => setEditLogoUrl(e.target.value)}
                    style={{ width: "100px" }}
                  />
                ) : (
                  <img
                    src={manufacturer.logoUrl}
                    alt={manufacturer.manufacturerName}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td className="align-middle">
                {editingId === manufacturer.id ? (
                  <Form.Control
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ width: "150px" }}
                  />
                ) : (
                  manufacturer.manufacturerName
                )}
              </td>
              <td className="align-middle">{manufacturer.country}</td>
              <td className="align-middle">{manufacturer.createdBy}</td>
              <td className="align-middle">
                {new Date(manufacturer.createdDate).toISOString().split("T")[0]}
              </td>
              <td className="align-middle text-center">
                {editingId === manufacturer.id ? (
                  <Button
                    variant="primary"
                    onClick={() => handleSaveEdit(manufacturer.id)}
                  >
                    저장
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(manufacturer)}
                  >
                    수정
                  </Button>
                )}
              </td>
              <td className="align-middle text-center">
                <Form.Check
                  type="checkbox"
                  checked={selectedForDeletion.includes(manufacturer.id)}
                  onChange={() => handleCheckboxChange(manufacturer.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 페이징 기능 */}
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

      {/* 삭제 확인 모달 */}
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

export default ManufacturerList;
