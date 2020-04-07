import DotLoader from "react-spinners/DotLoader";

import React from "react";

const Spinner = ({ loadingState }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "250px"
      }}
    >
      <DotLoader
        size={150}
        loading={loadingState}
        color={"rgb(97, 149, 255)"}
      />
    </div>
  );
};

export default Spinner;
