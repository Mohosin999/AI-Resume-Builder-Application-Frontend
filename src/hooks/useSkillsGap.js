import { useContext } from "react";
import { ResumeInfoContext } from "../context/ResumeInfoContext";

const useSkillsGap = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  /**
   * Function to collect user's data.
   */
  function collectUserData() {
    const skills = resumeInfo?.attributes?.skills;
    const experience = resumeInfo?.attributes?.experience;
    const projects = resumeInfo?.attributes?.projects;
    const githubContribution = resumeInfo?.attributes?.githubContribution;
    const achievements = resumeInfo?.attributes?.achievements;
    const summary = resumeInfo?.attributes?.summary;

    return {
      skills,
      experience,
      projects,
      githubContribution,
      achievements,
      summary,
    };
  }

  /**
   * Function to create a skill gap prompt based on the user's data.
   *
   * @param {Object} userData - The user data object containing their skills, experience, projects, contributions, and Summary.
   * @returns {string} - A string containing the skill gap analysis prompt.
   */
  function createSkillGapPrompt(userData) {
    const {
      skills,
      experience,
      projects,
      githubContribution,
      achievements,
      summary,
    } = userData;

    // Build the prompt string dynamically based on user data
    let prompt = `Rate my resume using a percentage based on the following information (use the term "your resume is 100% ready") and one of the terms (child resume, intermediate resume, or professional resume) based on the information. Gives suggestions in 2 or 3 lines about how to improve and what should be added. Summary is optional ( remember it ). `;

    // Prompt for skills
    prompt += `**Skills:** `;
    prompt +=
      skills && skills.length > 0
        ? skills
            ?.map(
              (skill, index) =>
                `${skill.name} and my proficiency is ${skill.rating} out of 5${
                  index === skills.length - 1 ? "." : ""
                } `
            )
            .join(", ")
        : "No skills. ";

    // Prompt for experience
    prompt += `**Experience:** `;
    prompt +=
      experience && experience.length > 0
        ? experience
            .map(
              (expe, index) =>
                `${expe.title} and description is ${expe.workSummary}${
                  index === experience.length - 1 ? "." : ""
                } `
            )
            .join(", ")
        : "No experience. ";

    // Prompt for projects
    prompt += `**Projects:** `;
    prompt +=
      projects && projects.length > 0
        ? projects
            .map(
              (project, index) =>
                `${project.projectsName} and description is (${
                  project.workSummary
                })${index === projects.length - 1 ? "." : ""} `
            )
            .join(", ")
        : "No projects. ";

    // Prompt for github contribution
    prompt += `**GitHub Contribution:** `;
    prompt +=
      githubContribution && githubContribution.length > 0
        ? githubContribution
            .map(
              (contribution, index) =>
                `${contribution.repositoryName} and description is ${
                  contribution.workSummary
                }${index === githubContribution.length - 1 ? "." : ""} `
            )
            .join(", ")
        : "No GitHub contributions. ";

    // Prompt for achievements
    prompt += `**Achievements:** `;
    prompt += `${achievements || "No achievements"}`;

    // Prompt for summary
    prompt += `**Summary:** ${summary || "No summary. "}`;

    return prompt;
  }

  return {
    collectUserData,
    createSkillGapPrompt,
  };
};

export default useSkillsGap;
