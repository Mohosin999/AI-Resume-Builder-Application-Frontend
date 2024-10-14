import React from "react";

const CustomParagraph = ({ children, className = "" }) => {
  return (
    <p className={`text-gray-600 mt-1 text-sm md:text-base ${className}`}>
      {children}
    </p>
  );
};

export default CustomParagraph;
