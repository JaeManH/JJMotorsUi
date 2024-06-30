import Carousel from "react-bootstrap/Carousel";

function MainCarousel({ carImage }) {
  return (
    <Carousel
      style={{
        width: "1280px",
        height: "200px",
        margin: "auto",
        marginTop: "20px",
        // backgroundColor: "gray",
      }}
    >
      {carImage.map((e, i) => {
        return (
          <Carousel.Item>
            {/* <ExampleCarouselImage text="First slide" /> */}
            <img src={e} alt="" className="testImg" />
            <Carousel.Caption>
              <h3>{i + 1} 번째 프로모션</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default MainCarousel;
