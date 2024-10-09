import React, { useState, useCallback, useMemo } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  const pathName = useMemo(
    () => window.location.pathname,
    [window.location.pathname]
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navBar1">
      <Navbar
        color="dark"
        dark
        expand="md"
        className="fixed-top d-flex justify-content-between"
      >
        <NavbarToggler onClick={toggle} style={{ width: "auto" }} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link
                to="/BlogManager"
                onClick={toggle}
                className={`nav-link ${
                  pathName === "/BlogManager" ? "active" : ""
                }`}
              >
                My Blogs
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="/AllBlogs"
                onClick={toggle}
                className={`nav-link ${
                  pathName === "/AllBlogs" ? "active" : ""
                }`}
              >
                All Blogs
              </Link>
            </NavItem>
          </Nav>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/login" onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
