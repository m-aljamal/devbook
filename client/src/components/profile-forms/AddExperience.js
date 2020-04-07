import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Form } from "semantic-ui-react";
import styled from 'styled-components'
const AddExperience = ({ addExperience, history }) => {
  const [fromData, setFromData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = fromData;
  const onChange = (e) =>
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  return (
    <Exper>
      <h1>Add An Experience</h1>
      <p>Add any developer/programing postion that you have had in the post</p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(fromData, history);
        }}
      >
        <Form.Field>
          <Form.Input
            fluid
            label="Job Title"
            placeholder="Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
          <Form.Input
            fluid
            label="Company"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <Form.Input
            fluid
            label="Location"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <p>From Date</p>
          <input
            type="date"
            value={from}
            name="from"
            onChange={(e) => onChange(e)}
          />
          <Form.Checkbox
            checked={current}
            label="Current Jop"
            value={current}
            name="current"
            onChange={(e) => {
              setFromData({ ...fromData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />

          <p>To Date</p>
          <input
            disabled={toDateDisabled && "disabled"}
            type="date"
            value={to}
            name="to"
            onChange={(e) => onChange(e)}
            value={to}
          />
          <Form.TextArea
            label="Job Description"
            placeholder="Tell us more about your job..."
            name="description"
            onChange={(e) => onChange(e)}
          />
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
    </Exper>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));


const Exper = styled.div`
 max-width: 95%;
  margin: 20px auto;


`