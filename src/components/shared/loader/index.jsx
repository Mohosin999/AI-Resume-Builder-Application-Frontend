import React from "react";
import PropTypes from "prop-types";
import { LoaderCircle } from "lucide-react";

/**
 * Loader Component
 *
 * @param {string} height - It will be string.
 * @param {string} className - It will be string.
 * @returns
 */
const Loader = ({ height = "h-screen", className }) => (
  <div className={`flex items-center justify-center ${height} ${className}`}>
    <LoaderCircle className="animate-spin mr-1 text-gray-100" />
    <img src="/logo.svg" alt="Loading..." width="100" height="100" />
  </div>
);

// Define PropTypes for the component
Loader.propTypes = {
  height: PropTypes.string, // height is expected to be a string (e.g., Tailwind class)
  className: PropTypes.string, // className is also expected to be a string
};

// Define default values for props
Loader.defaultProps = {
  height: "h-screen", // Default height is full screen
  className: "", // Default empty className
};

export default Loader;
