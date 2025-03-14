
import React from "react";

const DynamicDiv = ({ bgColor }) => {
  const divStyle = {
    backgroundColor: bgColor,
    padding: "20px",
    marginTop: "10px",
    textAlign: "center",
    borderRadius: "8px",
    color: "#fff",
  };

  return <div style={divStyle}>This div changes color dynamically!</div>;
};

export default DynamicDiv;
