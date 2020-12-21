import React from "react";
import * as RBS from "react-bootstrap";
import logo from "../../images/mattscomics.svg"

function Nav() {
  return (
    <div className="navbarContainer">
      <div className="navImg">
      <img src={logo}/>
      </div>
      <RBS.Navbar expand="lg" className="containerStyle"> 
        <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <RBS.Navbar.Collapse id="basic-navbar-nav">
          <RBS.Nav className="mr-auto navLinksCstm">
            <RBS.Nav.Link href="/comics">Home</RBS.Nav.Link>
            <RBS.Nav.Link href="/manage">Manage</RBS.Nav.Link>
          </RBS.Nav>
          <RBS.Form inline>
            <RBS.FormControl type="text" placeholder="Uncanny Xmen" className="mr-sm-2" />
            <RBS.Button className="searchBtn">Search</RBS.Button>
          </RBS.Form>
        </RBS.Navbar.Collapse>
      </RBS.Navbar>
    </div>
  );
}

export default Nav;
