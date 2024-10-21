import React from "react";

const CustomParagraph = ({ children, className = "" }) => {
  return (
    <p className={`text-[#72839E] mt-1 text-sm md:text-base ${className}`}>
      {children}
    </p>
  );
};

export default CustomParagraph;
