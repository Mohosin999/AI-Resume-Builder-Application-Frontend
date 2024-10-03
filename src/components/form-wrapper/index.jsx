import React from "react";

const FormWrapper = ({ children, className }) => {
  return (
    <div
      className={`p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-5 md:mt-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormWrapper;
