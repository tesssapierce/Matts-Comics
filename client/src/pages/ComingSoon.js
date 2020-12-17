import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

function ComingSoon() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Coming Soon</h1>
            <h2>Matt's Comics</h2>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default ComingSoon;
