import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { Label, Menu, Table, Button } from "semantic-ui-react";

import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <>
      <Table.Row key={exp.id}>
        <Table.Cell>
          <Label ribbon>{exp.company}</Label>
        </Table.Cell>
        <Table.Cell>{exp.title}</Table.Cell>
        <Table.Cell>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </Table.Cell>
        <Table.Cell>
          <Button onClick={() => deleteExperience(exp._id)} color="red">
            Delete
          </Button>
        </Table.Cell>
      </Table.Row>
    </>
  ));
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Experience Credemtials </h2>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Years</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{experiences}</Table.Body>
      </Table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
