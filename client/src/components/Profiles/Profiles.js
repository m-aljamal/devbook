import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
import styled from "styled-components";
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  // use useEffact to make it as soon this load will get users profiles
  useEffect(() => {
    getProfiles();
  }, []); // use empty to let it run once

  return (
    <div>
      {loading ? (
        <Spinner loadingState={loading} />
      ) : (
        <ProfilesStyle>
          <h1>Developers</h1>
          <p>Browse and connect with developers</p>
          <div className="cards">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found</h4>
            )}
          </div>
        </ProfilesStyle>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);

const ProfilesStyle = styled.div`
  max-width: 95%;
  margin: 20px auto;
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
