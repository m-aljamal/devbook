import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from "../../actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import styled from "styled-components";
import DashbordActions from "./DashbordActions";
import Experience from "./Experience";
import Education from "./Education";
import { Button } from 'semantic-ui-react'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner loadingState={loading} />
  ) : (
    <DashboardStyle>
      <h1>Dashboard</h1>
      {/* if user exist show user name */}
      <p>Welcome {user && user.name}</p>
      {/* show something difirent if user do not have profile */}
      {profile !== null ? (
        <>
          {" "}
          <DashbordActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education}/>
          <Button onClick={() => deleteAccount()} style={{margin: '20px 0'}} negative>Delete My Account</Button>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, plese add some info</p>
          <Link className="link" to="/create-profile">
            Create Profile
          </Link>
        </>
      )}
    </DashboardStyle>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  deleteAccount: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount  })(Dashboard);

const DashboardStyle = styled.div`
  max-width: 95%;
  margin: 20px auto;
  .link {
    background-color: rgb(97, 149, 255);
    padding: 4px;
    color: white;
  }
`;
