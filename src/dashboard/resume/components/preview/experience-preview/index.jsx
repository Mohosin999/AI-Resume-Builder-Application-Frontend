import React from "react";
import PropTypes from "prop-types";

/**
 * ExperiencePreview component.
 *
 * @param {Object} resumeInfo - The resume information containing experience details to be displayed.
 * @returns {JSX.Element}
 */
const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.experience?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor || "#f5f5f5" }}
          >
            Experience
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}
          {resumeInfo?.attributes?.experience
            ?.slice() // Create a shallow copy of the array
            .reverse() // Reverse the order of the array
            .map((item, index) => (
              <div className="my-2" key={index}>
                {/* Company Name and Location */}
                <h2
                  className="font-bold text-sm md:text-base flex justify-between items-center"
                  style={{
                    color: resumeInfo?.attributes?.themeColor || "#f5f5f5",
                  }}
                >
                  {item?.companyName}
                  {/* City and State */}
                  <span className="font-normal text-xs">
                    {item?.city && (
                      <>
                        {item?.city}
                        {item?.state && " , "}
                      </>
                    )}
                    {item?.state}
                  </span>
                </h2>

                {/* Title */}
                <h2 className="font-bold text-gray-400 text-xs md:text-sm flex justify-between items-center">
                  {item?.title}
                  {/* Start and end date or present situation */}
                  <span
                    className="font-normal text-xs"
                    style={{ color: resumeInfo?.attributes?.themeColor }}
                  >
                    {item?.startDate && (
                      <>
                        {item.startDate}
                        {(item?.endDate || item?.currentlyWorking) && " - "}
                      </>
                    )}
                    {item?.currentlyWorking ? "Present" : item?.endDate}
                  </span>
                </h2>

                {/* Work summary */}
                <div
                  className="text-xs text-gray-400 md:text-sm mt-1 leading-5"
                  dangerouslySetInnerHTML={{ __html: item?.workSummary }}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

ExperiencePreview.propTypes = {
  resumeInfo: PropTypes.object.isRequired,
};

export default ExperiencePreview;
