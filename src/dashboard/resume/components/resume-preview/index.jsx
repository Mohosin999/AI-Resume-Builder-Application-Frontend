import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import PersonalDetailsPreview from "../preview/personal-details-preview";
import SummaryPreview from "../preview/summary-preview";
import ExperiencePreview from "../preview/experience-preview";
import EducationalPreview from "../preview/educational-preview";
import SkillsPreview from "../preview/skills-preview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  console.log("akash ", resumeInfo);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />

      {/* Summery */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Educational Details */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
