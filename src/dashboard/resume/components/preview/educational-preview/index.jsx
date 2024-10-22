import React from "react";
import PropTypes from "prop-types";

/**
 * EducationalPreview component.
 *
 * @param {Object} resumeInfo - The resume information containing educational details to be displayed.
 * @returns {JSX.Element}
 */
const EducationalPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.education?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor || "#f5f5f5" }}
          >
            Education
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}
          {resumeInfo?.attributes?.education?.map((item, index) => (
            <div className="my-2" key={index}>
              {/* University name */}
              <h2
                className="font-bold text-sm md:text-base"
                style={{
                  color: resumeInfo?.attributes?.themeColor || "#f5f5f5",
                }}
              >
                {item?.universityName}
              </h2>

              {/* Degree name */}
              <h2 className="text-xs md:text-sm text-gray-400 flex justify-between">
                {item?.degree} in {item?.major}
                <span
                  className="text-xs"
                  style={{ color: resumeInfo?.attributes?.themeColor }}
                >
                  {item?.startDate} - {item?.endDate}
                </span>
              </h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

EducationalPreview.propTypes = {
  resumeInfo: PropTypes.object.isRequired,
};

export default EducationalPreview;
