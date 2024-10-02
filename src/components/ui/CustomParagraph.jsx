import React from "react";

const CustomParagraph = ({ children, className = "" }) => {
  return <p className={`mt-1 text-sm md:text-base ${className}`}>{children}</p>;
};

export default CustomParagraph;
