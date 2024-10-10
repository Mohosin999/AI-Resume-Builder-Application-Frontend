import React from "react";

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
      <h2 className="font-medium text-sm text-center">
        {resumeInfo?.attributes?.jobTitle}
      </h2>

      {/*
       * =========================================================
       *            Email, Social Link and Address
       * =========================================================
       */}
      <div className="flex justify-center items-center space-x-2">
        {/* Email */}
        <h2
          className="font-normal text-xs"
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
          className="font-normal text-xs"
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
          className="font-normal text-xs text-center"
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

export default PersonalDetailsPreview;
