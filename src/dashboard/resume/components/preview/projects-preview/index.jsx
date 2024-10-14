import React from "react";

const ProjectsPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.projects?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            Projects
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}
          {resumeInfo?.attributes?.projects
            ?.slice() // Create a shallow copy of the array
            .reverse() // Reverse the order of the array
            .map((item, index) => (
              <div className="my-2" key={index}>
                {/* Company Name and Location */}
                <h2
                  className="font-bold text-sm md:text-base"
                  style={{ color: resumeInfo?.attributes?.themeColor }}
                >
                  {item?.projectsName}
                </h2>

                {/* Work summary */}
                <div
                  className="text-xs md:text-sm mt-1 leading-5"
                  dangerouslySetInnerHTML={{ __html: item?.workSummary }}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ProjectsPreview;
