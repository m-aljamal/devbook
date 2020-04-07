import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertStyle className={alert.alertType} key={alert.id}>
      {alert.msg}
    </AlertStyle>
  ));
Alert.PropTypes = {
  alerts: PropTypes.array.isRequired,
};
const AlertStyle = styled.div`
  text-align: center;
  padding: 10px;
  color: white;
  font-size: 1.3rem;
  width: 95%;
  margin: 15px auto;
  text-align: center;
`;
const mapStateToProps = (state) => ({
  alerts: state.alert, // alert comes from index reducers
});
export default connect(mapStateToProps)(Alert); // connect takes first state secound action
