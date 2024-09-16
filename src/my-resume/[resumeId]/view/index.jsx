import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import { Button } from "../../../components/ui/button";
import ResumePreview from "../../../dashboard/resume/components/resume-preview";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();

  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res?.data?.data);
    });
  };

  /**
   * Function to handle download
   */
  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          {/* Heading and Sub-heading */}
          <h2 className="font-medium text-2xl text-center">
            Congrats! your resume is ready
          </h2>
          <p className="text-center text-gray-500">
            Now you are ready to download your resume and you can share it with
            your friends
          </p>

          {/* Buttons */}
          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            {/*
             * =================================================
             *     Apply share option on share button - start
             * =================================================
             */}
            <RWebShare
              data={{
                text: "This is my resume, Open the link to see it.",
                // url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                url: `${
                  import.meta.env.VITE_BASE_URL
                }/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.attributes?.firstName} ${resumeInfo?.attributes?.lastName} Resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
            {/*
             * =================================================
             *     Apply share option on share button - end
             * =================================================
             */}
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="my-10 mx-10 md:mx-20 lg:mx-36" id="print-area">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
