import React from "react";
import PropTypes from "prop-types";

/**
 * AchievementsPreview component.
 *
 * @param {Object} resumeInfo - The resume information containing achievement details to be displayed.
 * @returns {JSX.Element}
 */
const AchievementsPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.achievements?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor || "#f5f5f5" }}
          >
            Achievements
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}

          <div>
            {/* Achievement summary */}
            <div
              className="text-xs text-gray-400 md:text-sm my-2 leading-5"
              dangerouslySetInnerHTML={{
                __html: resumeInfo?.attributes?.achievements,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

AchievementsPreview.propTypes = {
  resumeInfo: PropTypes.object.isRequired,
};

export default AchievementsPreview;
