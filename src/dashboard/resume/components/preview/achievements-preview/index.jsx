import React from "react";

const AchievementsPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.achievements?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm text-center"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            Achievements
          </h1>
          {/* Horizontal line */}
          <hr
            className="mt-1 mb-3"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}
          {resumeInfo?.attributes?.achievements
            ?.slice() // Create a shallow copy of the array
            .reverse() // Reverse the order of the array
            .map((item, index) => (
              <div key={index}>
                {/* Achievement summary */}
                <div
                  className="text-xs mt-1 leading-5"
                  dangerouslySetInnerHTML={{ __html: item?.achievements }}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default AchievementsPreview;
