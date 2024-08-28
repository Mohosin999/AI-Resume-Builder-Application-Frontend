import React from "react";

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      {/* Heading */}
      <h1
        className="font-bold text-sm text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h1>
      {/* Horizontal line */}
      <hr className="mt-1" style={{ borderColor: resumeInfo?.themeColor }} />

      {/* Map the resumeInfo */}
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Skill name */}
            <h2 className="text-xs">{item?.name}</h2>
            {/* Rating */}
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${item?.rating * 20}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
