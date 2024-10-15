import React from "react";
import PropTypes from "prop-types";

/**
 * SkillsPreview component.
 *
 * @param {Object} resumeInfo - The resume information containing skills details to be displayed.
 * @returns {JSX.Element}
 */
const SkillsPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.skills?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            Skills
          </h1>
          {/* Horizontal line */}
          <hr
            className="mt-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}
          <div className="flex flex-wrap items-center justify-start my-2">
            {resumeInfo?.attributes?.skills?.map((item, index) => (
              <div key={index} className="flex items-center">
                {/* Skill name */}
                <h2 className="text-xs md:text-sm">{item?.name}</h2>

                {/* Dot separator (only add dot if not the last item) */}
                {index < resumeInfo.attributes.skills.length - 1 && (
                  <span className="mx-2">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

SkillsPreview.propTypes = {
  resumeInfo: PropTypes.object.isRequired,
};

export default SkillsPreview;
