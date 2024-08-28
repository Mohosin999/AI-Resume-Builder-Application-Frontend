import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return <p className="text-xs">{resumeInfo?.attributes?.summary}</p>;
};

export default SummaryPreview;
