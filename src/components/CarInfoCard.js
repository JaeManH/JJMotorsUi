// components/CarInfoCard.jsx
import React from "react";
import styled from "styled-components";

const CardContainer = styled.li`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  list-style: none;
`;

const LinkArea = styled.a`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: inherit;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
`;

const HeadImage = styled.div`
  position: relative;
  .el-image {
    border-radius: 4px;
    overflow: hidden;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
  .id {
    position: absolute;
    bottom: 8px;
    left: 8px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  img {
    width: 80px;
    height: 80px;
    margin: 5px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding: 10px;
`;

const SkuName = styled.p`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BaseInfo = styled.div`
  display: flex;
  .item {
    flex: 1;
    text-align: center;
  }
  .label {
    font-weight: bold;
  }
`;

const Descriptions = styled.div`
  .el-descriptions__body {
    table {
      width: 100%;
      border-collapse: collapse;
      td,
      th {
        border: 1px solid #ccc;
        padding: 8px;
      }
      .is-bordered-label {
        background: #f9f9f9;
        font-weight: bold;
      }
    }
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const Location = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const FobPrice = styled.p`
  font-size: 20px;
  color: #ff5733;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  .item {
    cursor: pointer;
  }
`;

const InquiryButton = styled.button`
  background-color: #ff5733;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: #e04e2b;
  }
`;

const CarInfoCard = ({ car }) => {
  return (
    <CardContainer>
      <LinkArea href={car.link}>
        <Left>
          <HeadImage>
            <div className="el-image">
              <img src={car.mainImage} alt={car.alt} />
            </div>
            <span className="id">{car.id}</span>
          </HeadImage>
          <ThumbnailContainer>
            {car.thumbnails.map((thumb, index) => (
              <img key={index} src={thumb} alt={`Thumbnail ${index + 1}`} />
            ))}
          </ThumbnailContainer>
        </Left>
        <Middle>
          <SkuName>{car.title}</SkuName>
          <BaseInfo>
            <div className="item">
              <p className="label">Reg. Year</p>
              <p className="value">{car.regYear}</p>
            </div>
            <div className="item">
              <p className="label">Mlg(km)</p>
              <p className="value">{car.mileage}</p>
            </div>
            <div className="item">
              <p className="label">Fuel</p>
              <p className="value">{car.fuel}</p>
            </div>
            <div className="item">
              <p className="label">Engine(cc)</p>
              <p className="value">{car.engine}</p>
            </div>
            <div className="item">
              <p className="label">Transm.</p>
              <p className="value">{car.transmission}</p>
            </div>
          </BaseInfo>
          <Descriptions>
            <div className="el-descriptions__body">
              <table className="el-descriptions__table is-bordered">
                <tbody>
                  <tr>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Model Year
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.modelYear}
                    </td>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Exterior Color
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.color}
                    </td>
                  </tr>
                  <tr>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Steering
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.steering}
                    </td>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Body Type
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.bodyType}
                    </td>
                  </tr>
                  <tr>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Engine
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.engineSpec}
                    </td>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Drivetrain
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.drivetrain}
                    </td>
                  </tr>
                  <tr>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Seats
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.seats}
                    </td>
                    <td className="el-descriptions__cell el-descriptions__label is-bordered-label">
                      Doors
                    </td>
                    <td className="el-descriptions__cell el-descriptions__content is-bordered-content">
                      {car.doors}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Descriptions>
        </Middle>
      </LinkArea>
      <Right>
        <Location>
          <svg aria-hidden="true" width="14" height="14">
            <use xlinkHref="#icon-location" fill="#333333"></use>
          </svg>{" "}
          {car.location}
        </Location>
        <FobPrice>{car.price}</FobPrice>
        <ButtonGroup>
          <span className="item" title="Inspect This Car">
            <svg aria-hidden="true" width="28" height="28">
              <use xlinkHref="#icon-inspection" fill="#858ea9"></use>
            </svg>
          </span>
          <a
            href=""
            rel="noopener noreferrer"
            target="_blank"
            className="item"
            title="Inquire This Car on WhatsApp"
          >
            <img
              src="data:image/png;base64,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"
              alt="WhatsApp"
            />
          </a>
          <a
            href=""
            rel="noopener noreferrer"
            target="_blank"
            className="item"
            title="Inquire This Car on Telegram"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABIJJREFUSEu9Vl1MXFUQ/ubc3WVZ/gpsCgLCUncXxIrRBxNqjGKLbTH+hAaLFEIaYxpjYnwo+IQhMZoIPJi+GBObBgktGC2VtCXUVuMDGpM+KFZbWCyLdCHUgi0UWe7uPWPuLizsDywQ4zzd3HPOfPPNfGfOEP5no7h4LS2isOQth4npZVLEXkjeTUQ79XPMfBtCuaaxvCJY+3r4d6sLLSQ38rkhYPGZmT1sMjUKyEqwNIE5ti8igIQKiIs+jVtHX039cT3QmIC2U2w2J997nwhvB4C2YiRUBk54M9Oa3eXkjTwaBeg8PWlVjJbPAXlwXUbxAiCChOgnRdTfqEqdWbs9DFBnlpDy91kwbx9sxTsRmKhfnU+vch9dZRoGWNwz0wbCceIN6x6PX2idSQCM9huHMxtDcax8FPVMPyXI8C1Y21rN4sGTokrV/9xwXdagvjXIsPoLxVld8SVJ3yt6SFs1jQGrSSDVRBhf0CKOE1gYzo1Upx8CkQwAFnZ6ikwJCUOQm2cnmWEUhMcyDKizJ6IsOwEMxt7zM1iMxBSKqi4tlY7V5w4HAB3d040Ko3Uz7DRmpBkFKnJNqHMmoSTTEErU9IKGAxdm4JWRWSJojCZXbVZbANDePT1ALJ9fN5UcDMWeoqDWkYgXCyzYYRbwS8aMV0OWRQcFfv5LRc2VWcSSHBNdGq3J3h8AdHZNeYg4JxJQbywKAU9YjWgoSkZ5XgIMIlj2iXk/Prx6D28+moJSa1Bn592LeGfwLgwiOnQJ4XHVZucFThednvQBHAxz2ZINhBcKEgNpc+wwhv7rrDqu30fnyAI+eSYDD2esivrTa/NoH5qDore6KCP/cG2OMQjY5fExEAI0K4Te/VbsWgOk73PP+fHeT3cxNufHyfJMODNWA9HX3x2cRa/bi5h4gH/kSG4Q0N51y0OgsJTmJwkczE/E0w+YkW1R8M3EIj7+dR5Ws4KufZnISQ5LCHTVHh64g19mfbGlwPC46nKDKbV3TQwI5jDR6CJZqaFeNr8EFAH0HshC8Zo0rnifVyUq+6Zweyl2l2LCJdeR/KBoHuqcaBQU/1roQRyyWdD8ZDqSjOHKuHnPh4q+KSjLogqnSZCsNf1Rbwtei8KTN4sMZtMQZPynSE+dM9WID8oy8PjOhJDfy+P/4Nj3d2IDCqH6vWrp2Ou7ghcfzMJ+ZvIr0vybbm0GIhwrScUbu1NhMQp8dHUWn12fjyEYAiuGc6Ov5ay2tmBa3XsE6Dswb7p5s842zYhn8xLR47qPOV3rkUakquDy8XrbD/pS2IUp7PizTQh5HFGtKbbw4v4VBCnRPtZgi36e9MO2U2NmxUBn6T98gDU/V7mPFoZGjaiWUNxxK9MnfJ2BV3+7TAWBiPoXpbHe05C3/oixkiKdKREvD1F6TTf7RurTG6kEcUKT3LyW2YrvDcfEgg5XGZGxSYGsZMkmrDd6kAAJUpnERU36WscbHFsbE8PEoA/CD9Y4hBAvMdE+Ah4hyVmB2yRomiF+I+bLUvr7xia6XWhp2f4gHFeF29jwL3iLuiy4ziFtAAAAAElFTkSuQmCC"
              alt="Telegram"
            />
          </a>
          <svg
            aria-hidden="true"
            width="28"
            height="28"
            className="collect item"
          >
            <use xlinkHref="#icon-favorite" fill="#000000"></use>
          </svg>
        </ButtonGroup>
        <InquiryButton>
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            style={{ marginRight: "5px" }}
          >
            <use xlinkHref="#icon-mail01" fill="#333333"></use>
          </svg>{" "}
          Inquire Now
        </InquiryButton>
      </Right>
    </CardContainer>
  );
};

export default CarInfoCard;
