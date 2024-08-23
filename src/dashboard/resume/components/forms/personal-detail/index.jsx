import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";

const PersonalDetail = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>
    </div>
  );
};

export default PersonalDetail;
