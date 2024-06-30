import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function ProductCard() {
  return (
    <Card style={{ margin: "2px", border: "none" }}>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{ padding: "6px" }}
      />
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>자동차</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">자세히 보기</small>
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
