// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import GlobalApi from "../../service/GlobalApi";
// import AddResume from "./components/add-resume";
// import ResumeCardItem from "./components/resume-card-item";
// import CustomParagraph from "../components/ui/CustomParagraph";
// import Loader from "../components/shared/loader";

// const Dashboard = () => {
//   // States
//   const [resumeList, setResumeList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Destructuring user from userUser hook
//   const { user } = useUser();

//   /**
//    * Hook is triggered whenever the user information changes.
//    * GetResumesList function is defined below.
//    */
//   useEffect(() => {
//     // If the user information is available, fetch the resume list
//     user && GetResumesList();
//   }, [user]);

//   /**
//    * Used to get user resume list based on their email.
//    * Once the data is received, it updates the "resumeList" state.
//    */
//   const GetResumesList = () => {
//     setLoading(true); // Set loading to true before the API call
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
//       (res) => {
//         setResumeList(res?.data?.data);
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     );
//   };

//   return (
//     <div className="p-4 mt-2 md:mt-6 md:px-20 lg:px-32">
//       {/* Heading and Sub-heading */}
//       <h2 className="font-bold text-gray-800 text-center text-xl md:text-2xl">
//         My All Resumes
//       </h2>
//       <CustomParagraph className="text-center">
//         Start building an AI-powered resume for your upcoming job opportunity.
//       </CustomParagraph>

//       {/*
//        * This section handles adding a new resume and displaying the list of
//        * existing resumes.
//        */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
//         <AddResume />

//         {/* Map the resume list to see the list of existing resumes */}
//         {loading ? (
//           <div className="flex justify-center items-center h-72">
//             <Loader />
//           </div>
//         ) : resumeList.length > 0 ? (
//           resumeList.map((resume, index) => (
//             <ResumeCardItem
//               resume={resume}
//               refreshData={GetResumesList}
//               key={index}
//             />
//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-500 text-xl md:text-2xl">
//             No resumes found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import AddResume from "./components/add-resume";
import ResumeCardItem from "./components/resume-card-item";
import CustomParagraph from "../components/ui/CustomParagraph";
import Loader from "../components/shared/loader";
// import SkeletonLoader from "../components/shared/skeleton-loader"; // Assume this is your skeleton loader component

const Dashboard = () => {
  // States
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Destructuring user from useUser hook
  const { user } = useUser();

  // Memoize user email to avoid unnecessary re-renders
  const userEmail = useMemo(
    () => user?.primaryEmailAddress?.emailAddress,
    [user]
  );

  // UseCallback to memoize the fetching function
  const GetResumesList = useCallback(() => {
    if (!userEmail) return; // Avoid API call if email is not available
    setLoading(true);
    GlobalApi.GetUserResumes(userEmail).then((res) => {
      setResumeList(res?.data?.data || []); // Ensure fallback to an empty array
      setLoading(false);
    });
  }, [userEmail]);

  // Effect to fetch resumes when the user information is available
  useEffect(() => {
    if (userEmail) {
      GetResumesList();
    }
  }, [userEmail, GetResumesList]);

  return (
    <div className="p-4 mt-2 md:mt-6 md:px-20 lg:px-32">
      {/* Heading and Sub-heading */}
      <h2 className="font-bold text-gray-800 text-center text-xl md:text-2xl">
        My All Resumes
      </h2>
      <CustomParagraph className="text-center">
        Start building an AI-powered resume for your upcoming job opportunity.
      </CustomParagraph>

      {/* Resume List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />

        {loading ? (
          <div className="flex justify-center items-center h-72">
            <Loader />
          </div>
        ) : resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCardItem
              resume={resume}
              refreshData={GetResumesList}
              key={resume.id} // Use unique key instead of index
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl md:text-2xl">
            No resumes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Dashboard); // Memoize Dashboard to avoid unnecessary re-renders
