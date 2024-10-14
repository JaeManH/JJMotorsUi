import Carousel from "react-bootstrap/Carousel";

function Carousel({ carImage }) {
  return (
    <Carousel
      style={{
        width: "1280px",
        height: "200px",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      {carImage.map((e, i) => {
        return (
          <Carousel.Item key={i}>
            <img src={e} alt={`Slide ${i + 1}`} className="testImg" />
            <Carousel.Caption>
              <h3>{i + 1} 번째 프로모션</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Carousel;
