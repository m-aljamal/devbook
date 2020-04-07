import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getProfileById } from "../../actions/profile";
import {Link} from 'react-router-dom'
import { profile_url } from "gravatar";
const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  return (
    <div>
      {profile === null || loading ? (
        <Spinner loadingState={loading} />
      ) : (
        <>
    <Link to='/profiles'>Back to profiles</Link>
    {auth.isAuthenticated && auth.loading === false  && auth.user._id === profile.user._id && (<Link to='/edit-profile'>Edit Profile</Link>)}
        </>
      )}{" "}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,

  // need auth to check if user is the profile owner will add edit button
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
