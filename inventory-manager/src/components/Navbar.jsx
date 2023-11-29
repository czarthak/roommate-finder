import "./Navbar.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = ({token}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link to="/" className="title">
        Home
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
          <>
              {
                  token == null ? <>
                      <li>
                      <NavLink to="/login">Login</NavLink>
                      </li>
                      <li>
                      <NavLink to="/register">Register</NavLink>
                      </li>
                      </>
                      :
                      <>
                      <li>
                          <NavLink to="/accountinfo">Account Information</NavLink>
                      </li>
                      </>
              }
          </>
        {/*<li>*/}
        {/*  <NavLink to="/login">Login</NavLink>*/}
        {/*</li>*/}

        {/*<li>*/}
        {/*  <NavLink to="/accountinfo">Account Information</NavLink>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
};
