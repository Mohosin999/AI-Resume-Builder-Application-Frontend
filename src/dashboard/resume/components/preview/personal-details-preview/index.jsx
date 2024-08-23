import React from "react";

const PersonalDetailsPreview = ({ resumeInfo }) => {
  return (
    <div>
      {/* Name */}
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      {/* Job title */}
      <h2 className="font-medium text-sm text-center">
        {resumeInfo?.jobTitle}
      </h2>
      {/* Address */}
      <h2
        className="font-normal text-xs text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.address}
      </h2>
      {/* Phone & Email */}
      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>

      {/* Horizontal line */}
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
};

export default PersonalDetailsPreview;