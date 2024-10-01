const useCalculateResumeScore = (resumeInfo) => {
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
  function createResumeScorePrompt(userData) {
    const {
      skills,
      experience,
      projects,
      githubContribution,
      achievements,
      summary,
    } = userData;

    // Build the prompt string dynamically based on user data
    let prompt = `Please analyze my resume and provide a JSON object with the following information:

* **resume_rating:** Provide a consistent percentage rating based on the resume information [Percentage rating of the resume, e.g., 100%]
* **resume_type:**  Classify the resume based on the following scale:
    * 0% - 40%: Beginner Resume
    * 41% - 60%: Intermediate Resume
    * 61% - 80%: Advanced Resume
    * 81% - 100%: Professional Resume
* **suggestions:** Provide suggestions within 3 or 4 options to improve the resume. Never suggest to add summary section. Give suggestions only how to make the resume more professional.
`;

    // Prompt for skills
    prompt += `**Skills:** `;
    prompt +=
      skills && skills.length > 0
        ? skills
            ?.map(
              (skill, index) =>
                `${skill.name}${index === skills.length - 1 ? "." : ""} `
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

    // Finishing line
    prompt += `**Important Note:** If the user clicks multiple times with the same information, always provide the same rating and suggestions. Do not change them even if they're clicked again. `;

    return prompt;
  }

  return {
    collectUserData,
    createResumeScorePrompt,
  };
};

export default useCalculateResumeScore;
