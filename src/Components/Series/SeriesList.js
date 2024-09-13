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

const SeriesList = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editSeriesName, setEditSeriesName] = useState("");
  const [editMobilityType, setEditMobilityType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [seriesPerPage, setSeriesPerPage] = useState(10); // 기본값 10으로 설정
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0); // 전체 항목 수 상태 추가
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const navigate = useNavigate();

  // 페이지 변경 및 페이지당 시리즈 수 변경 시 호출
  useEffect(() => {
    fetchSeries(searchQuery);
  }, [currentPage, seriesPerPage]); // currentPage와 seriesPerPage가 변경될 때마다 호출

  // 시리즈 목록 또는 검색어에 따른 시리즈 데이터 가져오기
  const fetchSeries = async (query = "") => {
    try {
      const response = await axios.get("http://localhost:8080/api/series", {
        params: {
          search: query,
          page: currentPage - 1, // 페이지는 0부터 시작
          size: seriesPerPage, // 페이지당 보여줄 시리즈 수 반영
        },
      });

      const seriesData = response.data.content; // 시리즈 데이터
      setSeriesList(seriesData); // 시리즈 목록 상태 업데이트
      setTotalPages(response.data.totalPages); // 총 페이지 수 업데이트
      setTotalElements(response.data.totalElements); // 전체 항목 수 업데이트
    } catch (error) {
      console.error("시리즈 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 초기화
    fetchSeries(searchQuery); // 검색어로 시리즈 목록 검색
  };

  const handlePageSizeChange = (e) => {
    setSeriesPerPage(parseInt(e.target.value)); // 페이지당 시리즈 수 업데이트
    setCurrentPage(1); // 페이지 수 변경 시 첫 페이지로 이동
  };

  const handleEdit = (series) => {
    setEditingId(series.id);
    setEditSeriesName(series.seriesName);
    setEditMobilityType(series.mobilityType);
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedSeries = {
        seriesName: editSeriesName,
        mobilityType: editMobilityType,
      };

      await axios.put(`http://localhost:8080/api/series/${id}`, updatedSeries);
      fetchSeries(searchQuery); // 수정 후 검색어 유지하면서 목록 갱신
      setEditingId(null);
    } catch (error) {
      console.error("시리즈 수정 중 오류가 발생했습니다:", error);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedForDeletion.length === 0) {
      alert("삭제할 시리즈를 선택하세요.");
      return;
    }

    try {
      await axios({
        method: "delete",
        url: "http://localhost:8080/api/series",
        data: selectedForDeletion, // 삭제할 시리즈 ID 리스트를 배열로 직접 전달
      });
      fetchSeries(searchQuery); // 삭제 후 검색어 유지하면서 목록 갱신
      setSelectedForDeletion([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("시리즈 삭제 중 오류가 발생했습니다:", error);
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
      <h1 className="text-center mb-4">시리즈 관리</h1>
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="시리즈 검색"
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
          <Form.Select value={seriesPerPage} onChange={handlePageSizeChange}>
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
            onClick={() => navigate("/admin/add-series")}
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
            <th style={{ width: "20%" }}>시리즈 이름</th>
            <th style={{ width: "20%" }}>모빌리티 타입</th>
            <th style={{ width: "20%" }}>브랜드 이름</th>
            <th style={{ width: "10%" }}>생성자</th>
            <th style={{ width: "10%" }}>생성일</th>
            <th style={{ width: "10%" }}>수정</th>
            <th style={{ width: "10%" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {seriesList && seriesList.length > 0 ? (
            seriesList.map((series) => (
              <tr key={series.id}>
                <td className="align-middle">
                  {editingId === series.id ? (
                    <Form.Control
                      type="text"
                      value={editSeriesName}
                      onChange={(e) => setEditSeriesName(e.target.value)}
                    />
                  ) : (
                    series.seriesName
                  )}
                </td>
                <td className="align-middle">
                  {editingId === series.id ? (
                    <Form.Control
                      type="text"
                      value={editMobilityType}
                      onChange={(e) => setEditMobilityType(e.target.value)}
                    />
                  ) : (
                    series.mobilityType
                  )}
                </td>
                <td className="align-middle">{series.brandName}</td>
                <td className="align-middle">{series.createdBy}</td>
                <td className="align-middle">
                  {series.createdDate
                    ? new Date(series.createdDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="align-middle text-center">
                  {editingId === series.id ? (
                    <Button
                      variant="primary"
                      onClick={() => handleSaveEdit(series.id)}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(series)}
                    >
                      수정
                    </Button>
                  )}
                </td>
                <td className="align-middle text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedForDeletion.includes(series.id)}
                    onChange={() => handleCheckboxChange(series.id)}
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

      {/* 페이지네이션 */}
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

export default SeriesList;
