import React from "react";
import styled from "styled-components";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // get only isAuthenticated and loading from auth not all of auth state
  const authLinks = (
    <>
      <Link style={{ margin: "0 25px" }} to="dashboard" className="link">
        Dashboard
      </Link>
      <Link to="#!" className="link" onClick={logout}>
        Logout
      </Link>
    </>
  );

  const guestLinks = (
    <>
     
      <Link to="register" style={{ margin: "0 20px" }} className="link">
        Register
      </Link>
      <Link to="/login" className="link">
        Login
      </Link>
    </>
  );
  return (
    <Header>
      <div className="header-content">
        <div className="logo">
          <Link to="/" style={{ color: "white", display: "flex" }}>
            <FaCode className="icon" />
            <h3>Devbook</h3>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="profiles">Developers</Link>
          {!loading && <> {isAuthenticated ? authLinks : guestLinks} </>}
        </div>
      </div>
    </Header>
  );
};
const Header = styled.header`
  width: 100%;
  height: 30px;
  background: rgba(109, 109, 109, 0.54);

  .header-content {
    height: 100%;
    max-width: 95%;
    margin: 0 auto;
    color: white;
    align-items: center;
    display: flex;
    justify-content: space-between;

    .logo {
      display: flex;
      .icon {
        margin-right: 5px;
        font-size: 1.5rem;
      }
    }
    .links {
      .link {
        color: white;
        font-size: 1.3rem;
        :hover {
          color: rgb(97, 149, 255);
        }
        @media (max-width: 500px) {
          font-size: 1rem;
        }
      }
    }
  }
`;
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar); // logout is from action
