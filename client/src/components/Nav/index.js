import React, { useState, useEffect } from "react"
import * as RBS from "react-bootstrap";
import logo from "../../images/mattscomics.png"

function Nav(props) {

  function handleSubmit(event){
    event.preventDefault()
    props.logout()
  }

  return (
    <div className="navbarContainer">
      <div className="navImg">
      <img src={logo} className="logoImg img-fluid"/>
      </div>
      <RBS.Navbar expand="lg" className="containerStyle"> 
        <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <RBS.Navbar.Collapse id="basic-navbar-nav">
          <RBS.Nav className="mr-auto navLinksCstm">
            <RBS.Nav.Link href="/comics">Home</RBS.Nav.Link>
            <RBS.Nav.Link href="/browse">Browse</RBS.Nav.Link>
            {props.isAuth ? (
            <RBS.Nav.Link href="/" onClick={handleSubmit}>Sign Out</RBS.Nav.Link>
            ):(
            <RBS.Nav.Link href="/">Sign In</RBS.Nav.Link>
            )}
          </RBS.Nav>
        </RBS.Navbar.Collapse>
      </RBS.Navbar>
    </div>
  );
}

export default Nav;
