import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Heading */}
      <h1
        className="font-bold text-sm text-center"
        style={{ color: resumeInfo?.attributes?.themeColor }}
      >
        Professional Experience
      </h1>
      {/* Horizontal line */}
      <hr
        className="mt-1"
        style={{ borderColor: resumeInfo?.attributes?.themeColor }}
      />

      {/* Map the resumeInfo */}
      {resumeInfo?.attributes?.experience?.map((item, index) => (
        <div key={index} className="my-5">
          {/* Title */}
          <h2
            className="font-bold text-sm"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            {item?.title}
          </h2>

          {/* Company location */}
          <h2 className="text-xs flex justify-between">
            {item?.companyName} {item?.city} {item?.state}
            {/* Start and end date or present situation */}
            <span>
              {item?.startDate}{" "}
              {item?.currentlyWorking ? "Present" : item?.endDate}
            </span>
          </h2>

          {/* Work summary */}
          {/* <p className="text-xs my-2">{experience?.workSummary}</p> */}
          <div
            className="text-xs"
            dangerouslySetInnerHTML={{ __html: item?.workSummary }}
          />
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
