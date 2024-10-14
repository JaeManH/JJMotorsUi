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
import { useTranslation } from "react-i18next"; // i18n 훅 추가

const MobilityModelList = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [modelList, setModelList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modelsPerPage, setModelsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchModels(searchQuery);
  }, [currentPage, modelsPerPage]);

  const fetchModels = async (query = "") => {
    try {
      const response = await axios.get(`${apiUrl}/api/models`, {
        params: {
          search: query,
          page: currentPage - 1,
          size: modelsPerPage,
        },
      });

      setModelList(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error(t('mobilityModel.error'), error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchModels(searchQuery);
  };

  const handlePageSizeChange = (e) => {
    setModelsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleEdit = (modelId) => {
    navigate(`/admin/edit-model/${modelId}`);
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedForDeletion.length === 0) {
      alert(t('mobilityModel.modal.confirmDelete'));
      return;
    }

    try {
      await axios({
        method: "delete",
        url: `${apiUrl}/api/models`,
        data: selectedForDeletion,
      });
      fetchModels(searchQuery);
      setSelectedForDeletion([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(t('mobilityModel.error'), error);
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
        <h1 className="text-center mb-4">{t('mobilityModel.title')}</h1>
        <Row className="mb-3 justify-content-between">
          <Col xs="auto">
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                    placeholder={t('mobilityModel.searchPlaceholder')}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Button variant="primary" type="submit">
                  {t('mobilityModel.searchButton')}
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col xs="auto">
            <Form.Select value={modelsPerPage} onChange={handlePageSizeChange}>
              <option value="5">5 {t('mobilityModel.itemsPerPage')}</option>
              <option value="10">10 {t('mobilityModel.itemsPerPage')}</option>
              <option value="20">20 {t('mobilityModel.itemsPerPage')}</option>
              <option value="30">30 {t('mobilityModel.itemsPerPage')}</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Button
                variant="success"
                className="me-2"
                onClick={() => navigate("/admin/add-model")}
            >
              {t('mobilityModel.addButton')}
            </Button>
            <Button variant="danger" onClick={handleDeleteSelected}>
              {t('mobilityModel.deleteButton')}
            </Button>
          </Col>
        </Row>

        <Table bordered hover responsive>
          <thead>
          <tr>
            <th style={{ width: "20%" }}>{t('mobilityModel.table.image')}</th>
            <th style={{ width: "20%" }}>{t('mobilityModel.table.name')}</th>
            <th style={{ width: "10%" }}>{t('mobilityModel.table.year')}</th>
            <th style={{ width: "10%" }}>{t('mobilityModel.table.price')}</th>
            <th style={{ width: "20%" }}>{t('mobilityModel.table.series')}</th>
            <th style={{ width: "10%" }}>{t('mobilityModel.table.edit')}</th>
            <th style={{ width: "10%" }}>{t('mobilityModel.deleteButton')}</th>
          </tr>
          </thead>
          <tbody>
          {modelList && modelList.length > 0 ? (
              modelList.map((model) => (
                  <tr key={model.id}>
                    <td className="align-middle text-center">
                      <img
                          src={model.thumbnailImage}
                          alt="thumbnail"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="align-middle">{model.modelName}</td>
                    <td className="align-middle">{model.year}</td>
                    <td className="align-middle">{model.price}</td>
                    <td className="align-middle">{model.series.seriesName}</td>
                    <td className="align-middle text-center">
                      <Button
                          variant="warning"
                          onClick={() => handleEdit(model.id)}
                      >
                        {t('mobilityModel.table.edit')}
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
                  {t('mobilityModel.noData')}
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
            <Modal.Title>{t('mobilityModel.modal.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{t('mobilityModel.modal.body')}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {t('mobilityModel.modal.cancel')}
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              {t('mobilityModel.modal.confirmDelete')}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
};

export default MobilityModelList;