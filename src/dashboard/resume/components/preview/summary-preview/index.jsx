import React from "react";
import PropTypes from "prop-types";

/**
 * SummaryPreview component.
 *
 * @param {Object} resumeInfo - The resume information containing summary details to be displayed.
 * @returns {JSX.Element}
 */
const SummaryPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.summary && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor || "#f5f5f5" }}
          >
            Summary
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Summary Details */}
          <p className="text-xs md:text-sm my-2 text-gray-400 leading-5">
            {resumeInfo?.attributes?.summary}
          </p>
        </div>
      )}
    </>
  );
};

SummaryPreview.propTypes = {
  resumeInfo: PropTypes.object.isRequired,
};

export default SummaryPreview;
