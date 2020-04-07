import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
const AddEducation = ({ addEducation, history }) => {
  const [fromData, setFromData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = fromData;
  const onChange = (e) =>
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  return (
    <Educ>
      <h1>Add An Education</h1>
      <p>Add any school...</p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(fromData, history);
        }}
      >
        <Form.Field>
          <Form.Input
            fluid
            label="School"
            placeholder="School"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
          />
          <Form.Input
            fluid
            label="Degree"
            placeholder="Degree"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
          />
          <Form.Input
            fluid
            label="Field Of Study"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            label="Shool Description"
            placeholder="Tell us more about your study..."
            name="description"
            onChange={(e) => onChange(e)}
          />
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
    </Educ>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));

const Educ = styled.div`
  max-width: 95%;
  margin: 20px auto;
`;
