import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import styled from "styled-components";
import Select from "react-select";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
const options = [
  { value: "developer", label: "Developer" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "manager", label: "Manager" },
  { value: "student", label: "Student" },
];
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubUserName: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocial, toggleSocia] = useState(false);
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills:
        loading || !profile.skills.toString() ? "" : profile.skills.toString(),
      githubUserName:
        loading || !profile.githubUserName ? "" : profile.githubUserName,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading]);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubUserName,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelect = (value) => {
    setFormData({ ...formData, status: value.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <EditProfileStyle open={displaySocial}>
      <h1 className="title">Create Your Profile</h1>
      <p>Let's get some information to make your profile stand out</p>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Field>
          <Select
            className="select"
            value={status.value}
            onChange={(e) => handleSelect(e)}
            options={options}
          />
          <Form.Input
            fluid
            value={company}
            label="Company"
            placeholder="Company"
            name="company"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            value={website}
            label="Website"
            placeholder="Website"
            name="website"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            value={location}
            label="Location"
            placeholder="Location"
            name="location"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            value={skills}
            label="Plese use comma betwin values "
            placeholder="* Skills"
            name="skills"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            value={githubUserName}
            label="Github Username"
            placeholder="Github Username"
            name="githubUserName"
            onChange={(e) => handleChange(e)}
          />
          <Form.TextArea
            value={bio}
            label="About"
            placeholder="Tell us more about you..."
            name="bio"
            onChange={(e) => handleChange(e)}
          />
          <span
            className="socialButton"
            onClick={() => toggleSocia(!displaySocial)}
          >
            Add Social Network Links
          </span>
          <span>Optional</span>
          <Form.Field className="social" style={{ marginTop: "20px" }}>
            <Form.Input
              fluid
              value={twitter}
              label="Twitter URL"
              placeholder="Twitter URL"
              name="twitter"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              value={facebook}
              fluid
              label="FaceBook URL"
              placeholder="FaceBook URL"
              name="facebook"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              value={youtube}
              fluid
              label="Youtube URL"
              placeholder="Youtube URL"
              name="youtube"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              value={linkedin}
              fluid
              label="Linkedin URL"
              placeholder="Linkedin URL"
              name="linkedin"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              value={instagram}
              fluid
              label="Instagram URL"
              placeholder="Instagram URL"
              name="instagram"
              onChange={(e) => handleChange(e)}
            />
          </Form.Field>
          <Form.Button style={{ marginTop: "20px" }}>Submit</Form.Button>
        </Form.Field>
      </Form>
    </EditProfileStyle>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);

const EditProfileStyle = styled.div`
  max-width: 95%;
  margin: 20px auto;
  .title {
    color: rgb(97, 149, 255);
    margin: 10px 0;
  }
  .select {
    margin-bottom: 10px;
  }
  .social {
    display: ${(props) => (props.open ? "block" : "none")};
  }
  .socialButton {
    margin-right: 10px;
    background-color: coral;
    color: white;
    padding: 6px;
    cursor: pointer;
    border-radius: 13px;
  }
`;
