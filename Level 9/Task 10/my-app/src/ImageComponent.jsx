import React from "react";
import exampleImage from "./d.jpeg"; // Import image statically

const ImageComponent = () => {
  return <img src={exampleImage} alt="Optimized" className="optimized-image" />;
};

export default ImageComponent;
