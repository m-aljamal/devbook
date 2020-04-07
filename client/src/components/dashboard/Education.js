import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { Label, Menu, Table, Button } from "semantic-ui-react";

import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <>
      <Table.Row key={edu.id}>
        <Table.Cell>
          <Label ribbon>{edu.school}</Label>
        </Table.Cell>
        <Table.Cell>{edu.degree}</Table.Cell>
        <Table.Cell>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </Table.Cell>
        <Table.Cell>
          <Button onClick={() => deleteEducation(edu._id)} color="red">
            Delete
          </Button>
        </Table.Cell>
      </Table.Row>
    </>
  ));
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Education Credemtials </h2>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>School</Table.HeaderCell>
            <Table.HeaderCell>Degree</Table.HeaderCell>
            <Table.HeaderCell>Years</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{educations}</Table.Body>
      </Table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
