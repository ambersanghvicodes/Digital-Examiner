import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.css";
import Dropdown from "./Dropdown";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [navbar,setNavbar] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };


  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  const changeNvb = () => {
    if (window.scrollY >= 85) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', changeNvb)

  return (
    <>
      <nav className={navbar ? "nvb sticky-top active" : 'nvb sticky-top' }>
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Digital Examiner
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fa fa-times" : "fa fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          {props.userLoggedIn ? (
            <>
              <li className="nav-item">
                <Link
                  to="/subjects"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Subjects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user_details"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className="nav-item">
            <Link
              to="/contact-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/feedback"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Feedback
            </Link>
          </li>
          {props.userLoggedIn ? (
            <li>
              <Link
                to="/logout"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {props.userLoggedIn ? (
          <Button task="logout" />
        ) : (
          <div>
            <Button task="login" /> {"\u00A0"} <Button task="signup" />
          </div>
        )}
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
  };
};
export default connect(mapStateToProps, null)(Navbar);
