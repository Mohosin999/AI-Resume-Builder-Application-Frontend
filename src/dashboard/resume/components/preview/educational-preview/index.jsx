// import React from "react";

// const EducationalPreview = ({ resumeInfo }) => {
//   return (
//     <div className="my-6">
//       {/* Heading */}
//       <h1
//         className="font-bold text-sm text-center"
//         style={{ color: resumeInfo?.attributes?.themeColor }}
//       >
//         Education
//       </h1>
//       {/* Horizontal line */}
//       <hr
//         className="mt-1"
//         style={{ borderColor: resumeInfo?.attributes?.themeColor }}
//       />

//       {/* Map the resumeInfo */}
//       {resumeInfo?.attributes?.education?.map((item, index) => (
//         <div key={index} className="my-5">
//           {/* University name */}
//           <h2
//             className="font-bold text-sm"
//             style={{ color: resumeInfo?.attributes?.themeColor }}
//           >
//             {item?.universityName}
//           </h2>

//           {/* Degree name */}
//           <h2 className="text-xs flex justify-between">
//             {item?.degree} in {item?.major}
//             <span>
//               {item?.startDate} - {item?.endDate}
//             </span>
//           </h2>

//           {/* Education description */}
//           <p className="text-xs my-2">{item?.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EducationalPreview;

import React from "react";

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <>
      {resumeInfo?.attributes?.education?.length > 0 && (
        <div className="my-6">
          {/* Heading */}
          <h1
            className="font-bold text-sm text-center"
            style={{ color: resumeInfo?.attributes?.themeColor }}
          >
            Education
          </h1>
          {/* Horizontal line */}
          <hr
            className="mt-1 mb-3"
            style={{ borderColor: resumeInfo?.attributes?.themeColor }}
          />

          {/* Map the resumeInfo */}
          {resumeInfo?.attributes?.education?.map((item, index) => (
            <div key={index}>
              {/* University name */}
              <h2
                className="font-bold text-sm"
                style={{ color: resumeInfo?.attributes?.themeColor }}
              >
                {item?.universityName}
              </h2>

              {/* Degree name */}
              <h2 className="text-xs flex justify-between">
                {item?.degree} in {item?.major}
                <span>
                  {item?.startDate} - {item?.endDate}
                </span>
              </h2>

              {/* Education description */}
              <p className="text-xs my-2">{item?.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EducationalPreview;
