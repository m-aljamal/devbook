import React from "react";
import styled from "styled-components";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
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
          <Link to="/developers" className="link">
            Developers
          </Link>
          <Link to="register" style={{ margin: "0 20px" }} className="link">
            Register
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </Header>
  );
};
const Header = styled.header`
  width: 100%;
  height: 30px;
  background: rgba(109, 109, 109, 0.54);
  position: absolute;
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
export default Navbar;
