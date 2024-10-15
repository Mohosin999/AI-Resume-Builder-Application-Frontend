import React from "react";
import PropTypes from "prop-types";

/**
 * FormWrapper component that wraps form elements with additional styling or structure.
 *
 * @param {React.ReactNode} children - The form elements or content to be wrapped.
 * @param {string} className - Optional additional class names for styling.
 * @returns {JSX.Element}
 */
const FormWrapper = ({ children, className }) => {
  return (
    <div
      className={`p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-5 md:mt-10 ${className}`}
    >
      {children}
    </div>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FormWrapper;
