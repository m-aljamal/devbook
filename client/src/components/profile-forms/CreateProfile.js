import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import Select from "react-select";
import { createProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
const options = [
  { value: "developer", label: "Developer" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "manager", label: "Manager" },
  { value: "student", label: "Student" },
];
const CreateProfile = ({ createProfile, history }) => {
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
    createProfile(formData, history)
  };

  return (
    <CreateProfileStyle open={displaySocial}>
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
            label="Company"
            placeholder="Company"
            name="company"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            label="Website"
            placeholder="Website"
            name="website"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            label="Location"
            placeholder="Location"
            name="location"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            label="Plese use comma betwin values "
            placeholder="* Skills"
            name="skills"
            onChange={(e) => handleChange(e)}
          />
          <Form.Input
            fluid
            label="Github Username"
            placeholder="Github Username"
            name="githubUserName"
            onChange={(e) => handleChange(e)}
          />
          <Form.TextArea
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
              label="Twitter URL"
              placeholder="Twitter URL"
              name="twitter"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              label="FaceBook URL"
              placeholder="FaceBook URL"
              name="facebook"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              label="Youtube URL"
              placeholder="Youtube URL"
              name="youtube"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              label="Linkedin URL"
              placeholder="Linkedin URL"
              name="linkedin"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
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
    </CreateProfileStyle>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));

const CreateProfileStyle = styled.div`
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
