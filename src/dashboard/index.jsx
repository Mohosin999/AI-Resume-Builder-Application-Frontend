import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import AddResume from "./components/add-resume";
import ResumeCardItem from "./components/resume-card-item";

const Dashboard = () => {
  // States
  const [resumeList, setResumeList] = useState([]);

  // Destructuring user from userUser hook
  const { user } = useUser();

  /**
   * Hook is triggered whenever the user information changes.
   * GetResumesList function is defined below.
   */
  useEffect(() => {
    // If the user information is available, fetch the resume list
    user && GetResumesList();
  }, [user]);

  /**
   * Used to get user resume list based on their email.
   * Once the data is received, it updates the "resumeList" state.
   */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setResumeList(res?.data?.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {/* Heading and Sub-heading */}
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>
        Start building an AI-powered resume for your upcoming job opportunity.
      </p>

      {/*
       * This section handles adding a new resume and displaying the list of
       * existing resumes.
       */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />

        {/* Map the resume list to see the list of existing resumes */}
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              refreshData={GetResumesList}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
