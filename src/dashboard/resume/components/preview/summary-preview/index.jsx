import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.summary && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            Summary
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Summary Details */}
          <p className="text-xs md:text-sm my-2 text-gray-700 leading-5">
            {resumeInfo?.attributes?.summary}
          </p>
        </div>
      )}
    </>
  );
};

export default SummaryPreview;
