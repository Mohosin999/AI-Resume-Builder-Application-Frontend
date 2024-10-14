import React from "react";

const AchievementsPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.achievements?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm md:text-lg text-center"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            Achievements
          </h1>
          {/* Horizontal line */}
          <hr
            className="my-1"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}

          <div>
            {/* Achievement summary */}
            <div
              className="text-xs md:text-sm my-2 leading-5"
              dangerouslySetInnerHTML={{
                __html: resumeInfo?.attributes?.achievements,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementsPreview;
