import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  let testCarImage =
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const carData = {
    mainImage: testCarImage,
    thumbnails: [testCarImage, testCarImage, testCarImage],
    title: "2018 CHANGAN OSHAN X70A 1.5L 107HP L4 5MT",
    price: "FOB:$4,756",
    modelYear: "2018",
    color: "White",
    steering: "Left",
    bodyType: "SUV",
    engine: "1.5L 107HP L4",
    drivetrain: "2WD",
    seats: "7",
    doors: "5",
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">KS Motors</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/purchase">구매</Nav.Link>
            {/* <Nav.Link href="/sale">판매</Nav.Link> */}
            {/* <Nav.Link href="/productcard/1">제품카드</Nav.Link> */}
            <Nav.Link href="/howtobuy">구매방법</Nav.Link>
            <Nav.Link href="/contact">문의하기</Nav.Link>
            <Nav.Link href="/test">Test</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href="/login">로그인</Nav.Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
