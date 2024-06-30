import { CardGroup } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import MainCarousel from "../components/MainCarousel";

function MainPage() {
  let productSample = ["a", "b", "c", "d", "e"];
  let testCarImage = [
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div>
      <SearchBar></SearchBar>
      <MainCarousel carImage={testCarImage}></MainCarousel>

      <div className="productCardGroupTitle">인기상품</div>
      <CardGroup style={{ padding: "12px" }}>
        {productSample.map((value, i) => {
          return <ProductCard></ProductCard>;
        })}
      </CardGroup>
    </div>
  );
}

export default MainPage;
