import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import AddResume from "./add-resume";
import GlobalApi from "../../service/GlobalApi";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  /**
   * Used to get user resume list
   */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setResumeList(res.data.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating AI resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        <AddResume />

        {/* Map resume list */}
      </div>
    </div>
  );
};

export default Dashboard;
