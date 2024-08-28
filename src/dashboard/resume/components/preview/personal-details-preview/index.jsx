import React from "react";

const PersonalDetailsPreview = ({ resumeInfo }) => {
  return (
    <div>
      {/* Name */}
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
      {/* Address */}
      <h2
        className="font-normal text-xs text-center"
        style={{
          color: resumeInfo?.attributes?.themeColor,
        }}
      >
        {resumeInfo?.attributes?.address}
      </h2>
      {/* Phone & Email */}
      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.attributes?.themeColor,
          }}
        >
          {resumeInfo?.attributes?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.attributes?.themeColor,
          }}
        >
          {resumeInfo?.attributes?.email}
        </h2>
      </div>

      {/* Horizontal line */}
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.attributes?.themeColor }}
      />
    </div>
  );
};

export default PersonalDetailsPreview;
