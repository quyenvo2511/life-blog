import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/logo.png";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as types from "../redux/constants/auth.constants";

const PublicNavbar = () => {
  const history = useHistory();
  const name = useSelector((state) => state.auth.user.name);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogOut = () => {
    sessionStorage.setItem(types.ACCESS_TOKEN, null);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img
          src={logo}
          alt="CoderSchool"
          width="100px"
          onClick={() => history.push("/")}
        />
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
        {isAuthenticated ? (
          <span style={{ padding: "8px" }}>{name}</span>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
        {!isAuthenticated ? (
          <Nav.Link href="/register">Register</Nav.Link>
        ) : (
          <Nav.Link onClick={() => handleLogOut()} href="/login">
            Log out
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
