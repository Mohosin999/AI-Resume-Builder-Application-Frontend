import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import PersonalDetailsPreview from "../preview/personal-details-preview";
import SummaryPreview from "../preview/summary-preview";
import ExperiencePreview from "../preview/experience-preview";
import ProjectsPreview from "../preview/projects-preview";
import GithubContributionPreview from "../preview/github-contribution-preview";
import AchievementsPreview from "../preview/achievements-preview";
import EducationalPreview from "../preview/educational-preview";
import SkillsPreview from "../preview/skills-preview";
import Loader from "../../../../components/shared/loader";

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  // Check if resumeInfo is not available (data is still loading)
  const isLoading = !resumeInfo || !resumeInfo.attributes;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="shadow-lg h-full p-3 md:p-5 border-t-[10px] md:border-t-[14px]"
          style={{ borderColor: resumeInfo?.attributes?.themeColor }}
        >
          {/* Personal Details */}
          <PersonalDetailsPreview resumeInfo={resumeInfo} />

          {/* Summery */}
          <SummaryPreview resumeInfo={resumeInfo} />

          {/* Professional Experience */}
          <ExperiencePreview resumeInfo={resumeInfo} />

          {/* Projects */}
          <ProjectsPreview resumeInfo={resumeInfo} />

          {/* Github Contribution */}
          <GithubContributionPreview resumeInfo={resumeInfo} />

          {/* Achievements */}
          <AchievementsPreview resumeInfo={resumeInfo} />

          {/* Educational Details */}
          <EducationalPreview resumeInfo={resumeInfo} />

          {/* Skills */}
          <SkillsPreview resumeInfo={resumeInfo} />
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
