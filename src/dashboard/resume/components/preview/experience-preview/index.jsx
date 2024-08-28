import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Heading */}
      <h1
        className="font-bold text-sm text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h1>
      {/* Horizontal line */}
      <hr className="mt-1" style={{ borderColor: resumeInfo?.themeColor }} />

      {/* Map the resumeInfo */}
      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          {/* Title */}
          <h2
            className="font-bold text-sm"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>

          {/* Company location */}
          <h2 className="text-xs flex justify-between">
            {experience?.companyName} {experience?.city} {experience?.state}
            {/* Start and end date or present situation */}
            <span>
              {experience?.startDate}{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>

          {/* Work summary */}
          {/* <p className="text-xs my-2">{experience?.workSummary}</p> */}
          <div dangerouslySetInnerHTML={{ __html: experience?.workSummary }} />
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
