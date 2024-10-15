import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../ui/button";
import { LoaderCircle } from "lucide-react";

/**
 * CustomSaveButton component that renders a button with save functionality and loading state.
 *
 * @param {boolean} loading - Indicates if the button is in a loading state.
 * @param {string} [type="button"] - The HTML type of the button (e.g., "button", "submit").
 * @param {Function|null} [handleSave=null] - Optional callback function triggered when the button is clicked.
 * @returns {JSX.Element}
 */
const CustomSaveButton = ({ loading, type = "button", handleSave = null }) => {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={handleSave ? handleSave : undefined}
      size="sm"
      className="w-full md:w-auto"
    >
      {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
    </Button>
  );
};

CustomSaveButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string,
  handleSave: PropTypes.func,
};

export default CustomSaveButton;
