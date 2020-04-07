import React from "react";
import { Link } from "react-router-dom";
const DashbordActions = () => {
  return (
    <div>
      <Link to="/edit-profile"> Edit Profile </Link>
      <Link style={{ margin: "0 30px" }} to="/add-experience">
        {" "}
        Add Experience{" "}
      </Link>
      <Link to="/add-education"> Add Education </Link>
    </div>
  );
};

export default DashbordActions;
