import React from "react";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar({ reload }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await reload(true);
    navigate("/login");
  };

  return (
    <>
      <NavBar
        variant="dark"
        sticky="top"
        collapseOnSelect
        expand="lg"
        style={{
          backgroundImage:
            "linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )",
        }}
      >
        <NavBar.Brand
          className="text-wrap ms-3"
          style={{ color: "#1ab5e9", fontSize: "32px" }}
          as={Link}
          to="/wallet"
        >
          <b> Web Point of Sale </b>
        </NavBar.Brand>
        <NavBar.Toggle className="mx-2" aria-controls="responsive-navbar-nav" />

        <NavBar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className=" mx-4">
            <Nav.Link as={Link} to="/wallet">
              Wallet
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogue">
              Catalogue
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    </>
  );
}

export default Navbar;
