import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import AddResume from "./components/add-resume";
import ResumeCardItem from "./components/resume-card-item";
import CustomParagraph from "../components/ui/CustomParagraph";
import Loader from "../components/shared/loader";
import Wrapper from "../components/wrapper";
import GoToTopButton from "../components/shared/go-to-top-button";
import AnimatedHeading from "../components/shared/animated-heading";

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
    <Wrapper>
      <div className="px-4 md:px-20 lg:px-32">
        <AnimatedHeading
          text="My All Resumes"
          className="text-center !text-2xl md:!text-3xl"
        />
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

      {/* Go to top button */}
      <GoToTopButton />
    </Wrapper>
  );
};

export default React.memo(Dashboard);
