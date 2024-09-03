import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.summary && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm text-center"
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
          <p className="text-xs">{resumeInfo?.attributes?.summary}</p>
        </div>
      )}
    </>
  );
};

export default SummaryPreview;
