import React from "react";

const CustomParagraph = ({ children, className = "" }) => {
  return <p className={`mt-1 text-sm lg:text-base ${className}`}>{children}</p>;
};

export default CustomParagraph;
