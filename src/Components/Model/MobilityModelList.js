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

const MobilityModelList = () => {
  const [modelList, setModelList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage, setModelsPerPage] = useState(10); // 기본값 10으로 설정
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0); // 전체 항목 수 상태 추가
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동 제어
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);

  // 페이지 변경 및 페이지당 모델 수 변경 시 호출
  useEffect(() => {
    fetchModels(searchQuery);
  }, [currentPage, modelsPerPage]); // currentPage와 modelsPerPage가 변경될 때마다 호출

  // 모델 목록 또는 검색어에 따른 모델 데이터 가져오기
  const fetchModels = async (query = "") => {
    try {
      const response = await axios.get(`${apiUrl}/api/models`, {
        params: {
          search: query,
          page: currentPage - 1, // 페이지는 0부터 시작
          size: modelsPerPage, // 페이지당 보여줄 모델 수 반영
        },
      });

      const modelData = response.data.content; // 모델 데이터
      console.log(response.data.content);
      setModelList(modelData); // 모델 목록 상태 업데이트
      setTotalPages(response.data.totalPages); // 총 페이지 수 업데이트
      setTotalElements(response.data.totalElements); // 전체 항목 수 업데이트
    } catch (error) {
      console.error("모델 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 시 첫 페이지로 초기화
    fetchModels(searchQuery); // 검색어로 모델 목록 검색
  };

  const handlePageSizeChange = (e) => {
    setModelsPerPage(parseInt(e.target.value)); // 페이지당 모델 수 업데이트
    setCurrentPage(1); // 페이지 수 변경 시 첫 페이지로 이동
  };

  const handleEdit = (modelId) => {
    // 모델 수정 페이지로 이동
    console.log(modelId);
    navigate(`/admin/edit-model/${modelId}`);
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedForDeletion.length === 0) {
      alert("삭제할 모델을 선택하세요.");
      return;
    }

    try {
      await axios({
        method: "delete",
        url: `${apiUrl}/api/models`,
        data: selectedForDeletion, // 삭제할 모델 ID 리스트를 배열로 직접 전달
      });
      fetchModels(searchQuery); // 삭제 후 검색어 유지하면서 목록 갱신
      setSelectedForDeletion([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("모델 삭제 중 오류가 발생했습니다:", error);
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
      <h1 className="text-center mb-4">모빌리티 모델 관리</h1>
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="모델 검색"
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
          <Form.Select value={modelsPerPage} onChange={handlePageSizeChange}>
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
            onClick={() => navigate("/admin/add-model")}
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
            <th style={{ width: "20%" }}>모델 사진</th>
            <th style={{ width: "20%" }}>모델 이름</th>
            <th style={{ width: "10%" }}>연식</th>
            <th style={{ width: "10%" }}>가격</th>
            <th style={{ width: "20%" }}>시리즈 이름</th>
            <th style={{ width: "10%" }}>수정</th>
            <th style={{ width: "10%" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {modelList && modelList.length > 0 ? (
            modelList.map((model) => (
              <tr key={model.id}>
                <td className="align-middle text-center">
                  <img
                    src={model.thumbnailImage} // 썸네일 이미지
                    alt="thumbnail"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td className="align-middle">{model.modelName}</td>
                <td className="align-middle">{model.year}</td>
                <td className="align-middle">{model.price}</td>
                <td className="align-middle">{model.series.seriesName}</td>
                <td className="align-middle text-center">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(model.id)} // 수정 버튼 클릭 시 해당 모델 ID로 수정 페이지 이동
                  >
                    수정
                  </Button>
                </td>
                <td className="align-middle text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedForDeletion.includes(model.id)}
                    onChange={() => handleCheckboxChange(model.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
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

export default MobilityModelList;
