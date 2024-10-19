import React from "react";

const Wrapper = ({ children, className }) => {
  return <div className={`mt-7 md:mt-12 ${className}}`}>{children}</div>;
};

export default Wrapper;
