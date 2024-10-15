import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useTranslation } from 'react-i18next';
import styles from "./MobilityModelDetail.module.css";

const MobilityModelDetail = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/models/${id}`);
        setCarData(response.data);
        console.log("Fetched car data:", response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car data not found</div>;
  }

  const carDetails = carData.detailsJson ? JSON.parse(carData.detailsJson) : {};

  const categorizedParameters = carData.parameters.reduce((acc, param) => {
    if (!acc[param.category]) {
      acc[param.category] = [];
    }
    acc[param.category].push({ name: param.parameterName, value: param.parameterValue });
    return acc;
  }, {});

  const renderDetailsSection = (title, data) => (
      <div className={styles.customTabContent}>
        <h3>{title}</h3>
        <Table striped bordered hover className={styles.detailsTable}>
          <tbody>
          {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
          ))}
          </tbody>
        </Table>
      </div>
  );

  return (
      <div className={styles.mobilityModelDetailContainer}>
        <div className={styles.modelDetails}>
          <div className={styles.carouselContainer}>
            <Carousel className={styles.carCarousel}>
              {carData.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.imageUrl}
                        alt={`Car image ${index + 1}`}
                    />
                  </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className={styles.detailsRight}>
            <div className={styles.detailsText}>
              <span>{t('MobilityModelDetail.model_name')}: </span>{carData.modelName}
            </div>
            <div className={styles.detailsText}>
              <span>{t('MobilityModelDetail.price')}: </span>{carData.price}
            </div>
            <div className={styles.detailsText}>
              <span>{t('MobilityModelDetail.year')}: </span>{carData.year}
            </div>
            <div className={styles.detailsText}>
              <span>{t('MobilityModelDetail.stock_status')}: </span>{carData.stockStatus}
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.contactButton}>{t('MobilityModelDetail.contact')}</button>
              <button className={styles.wishlistButton}>{t('MobilityModelDetail.wishlist')}</button>
            </div>
          </div>
        </div>
        <div className={styles.additionalDetails}>
          {carDetails.basicInfo &&
              renderDetailsSection(t('MobilityModelDetail.basic_info'), carDetails.basicInfo)}
          {carDetails.engineInfo &&
              renderDetailsSection(t('MobilityModelDetail.engine_info'), carDetails.engineInfo)}
          {carDetails.electricMotorInfo &&
              renderDetailsSection(t('MobilityModelDetail.electric_motor_info'), carDetails.electricMotorInfo)}
          {carDetails.chassisSteeringInfo &&
              renderDetailsSection(t('MobilityModelDetail.chassis_steering_info'), carDetails.chassisSteeringInfo)}
          {carDetails.transmissionInfo &&
              renderDetailsSection(t('MobilityModelDetail.transmission_info'), carDetails.transmissionInfo)}
          {carDetails.additionalTabs &&
              carDetails.additionalTabs.map((tab, index) =>
                  renderDetailsSection(
                      tab.title || `${t('MobilityModelDetail.additional_tab')} ${index + 1}`,
                      tab.data || []
                  )
              )}

          <h2>{t('MobilityModelDetail.specifications')}</h2>
          <div className={styles.tabsSection}>
            <Tabs
                defaultActiveKey={Object.keys(categorizedParameters)[0]}
                className={styles.customTabs}
            >
              {Object.entries(categorizedParameters).map(([category, parameters], index) => (
                  <Tab eventKey={category} title={category} key={index}>
                    {renderDetailsSection(category, parameters)}
                  </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
  );
};

export default MobilityModelDetail;
