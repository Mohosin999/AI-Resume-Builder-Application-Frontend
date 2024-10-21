import React from "react";
import PropTypes from "prop-types";

/**
 * PersonalDetailsPreview component.
 *
 * @param {Object} resumeInfo - The resume information containing personal details to be displayed.
 * @returns {JSX.Element}
 */
const PersonalDetailsPreview = ({ resumeInfo }) => {
  return (
    <div>
      {/*
       * =========================================================
       *                     Name and Job Title
       * =========================================================
       */}
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.attributes?.themeColor,
        }}
      >
        {resumeInfo?.attributes?.firstName} {resumeInfo?.attributes?.lastName}
      </h2>
      {/* Job title */}
      <h2 className="font-medium text-base text-center text-gray-600">
        {resumeInfo?.attributes?.jobTitle}
      </h2>

      {/*
       * =========================================================
       *            Email, Social Link and Address
       * =========================================================
       */}
      <div className="flex flex-wrap justify-center items-center space-x-2 text-gray-700">
        {/* Email */}
        <h2
          className="font-normal text-sm"
          style={{
            color: resumeInfo?.attributes?.themeColor,
          }}
        >
          {resumeInfo?.attributes?.email}
        </h2>
        {/* Bullet Point */}
        {resumeInfo?.attributes?.email &&
          resumeInfo?.attributes?.socialLink && (
            <span className="text-xs font-bold">•</span>
          )}

        {/* Social Link */}
        <h2
          className="font-normal text-sm"
          style={{
            color: resumeInfo?.attributes?.themeColor,
          }}
        >
          {resumeInfo?.attributes?.socialLink}
        </h2>
        {/* Bullet Point */}
        {resumeInfo?.attributes?.socialLink &&
          resumeInfo?.attributes?.address && (
            <span className="text-xs font-bold">•</span>
          )}

        {/* Address */}
        <h2
          className="font-normal text-sm text-center"
          style={{
            color: resumeInfo?.attributes?.themeColor,
          }}
        >
          {resumeInfo?.attributes?.address}
        </h2>
      </div>
    </div>
  );
};

PersonalDetailsPreview.propTypes = {
  resumeInfo: PropTypes.object.isRequired,
};

export default PersonalDetailsPreview;
