import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import logo from "../images/mattscomics.svg"
import "../index.css"

function ComingSoon() {
  return (

    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 comingSoonHeader">
            <img src={logo} className="logoImg" />
            <h3 className="containerStyle comingSoon">coming soon</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComingSoon;
