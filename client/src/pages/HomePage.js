import React from "react";
import img from "../img/home.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
const HomePage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
   return <Redirect to="/dashboard" />;
  }
  return (
    <HomeStyle>
      <div className="title">
        <h1>Developen Connector</h1>
        <p>
          Create a developer profile/portfolio, share posts and get help from
          another developer
        </p>

        <div className="buttons">
          <Link
            style={{
              marginRight: "30px",
              background: "#FFFFFF",
              color: "black"
            }}
            className="link"
            to="/register"
          >
            Sign Up
          </Link>
          <Link
            style={{ background: "#6195FF", color: "white" }}
            className="link"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </HomeStyle>
  );
};
const HomeStyle = styled.div`
  position: absolute;
  top: 0;
  z-index: -10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${img});
  background-size: cover;
  background-position: center;
  .title {
    color: white;
    h1 {
      text-align: center;
      font-size: 3.5rem;
      @media (max-width: 500px) {
        font-size: 2rem;
        margin-bottom: 10px;
      }
    }
    p {
      font-size: 1.5rem;
      @media (max-width: 500px) {
        font-size: 1rem;
        text-align: center;
        margin: 0;
      }
    }
  }
  .buttons {
    margin-top: 50px;
    text-align: center;
    @media (max-width: 500px) {
      margin-top: 30px;
    }
    .link {
      border-radius: 10px;
      padding: 15px 40px;
    }
  }
`;

HomePage.prototype = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(HomePage);
