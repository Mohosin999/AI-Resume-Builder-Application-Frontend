import React from "react";

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Heading */}
      <h1
        className="font-bold text-sm text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h1>
      {/* Horizontal line */}
      <hr className="mt-1" style={{ borderColor: resumeInfo?.themeColor }} />

      {/* Map the resumeInfo */}
      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="my-5">
          {/* University name */}
          <h2
            className="font-bold text-sm"
            style={{ color: resumeInfo?.themeColor }}
          >
            {education?.universityName}
          </h2>

          {/* Degree name */}
          <h2 className="text-xs flex justify-between">
            {education?.degree} in {education?.major}
            <span>
              {education?.startDate} - {education?.endDate}
            </span>
          </h2>

          {/* Education description */}
          <p className="text-xs my-2">{education?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationalPreview;
