import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import { Button } from "../../../components/ui/button";
import ResumePreview from "../../../dashboard/resume/components/resume-preview";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";
import useSkillsGap from "../../../hooks/useCalculateResumeScore";
import { AIChatSession } from "../../../../service/AIModal";
import { Loader2Icon, XIcon } from "lucide-react";
import CustomParagraph from "../../../components/ui/CustomParagraph";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedResumeScore, setAiGeneratedResumeScore] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res?.data?.data);
    });
  };

  // AI feature to check resume worth
  const { collectUserData, createResumeScorePrompt } = useSkillsGap(resumeInfo);

  const userData = collectUserData();
  const PROMPT = createResumeScorePrompt(userData);

  // Function to calculate resume score from AI
  const calculateResumeScoreFromAi = async () => {
    setLoading(true);
    console.log(PROMPT);

    const result = await AIChatSession.sendMessage(PROMPT);
    setAiGeneratedResumeScore(JSON.parse(result?.response.text()));
    setLoading(false);
    setShowModal(true); // Show modal when AI result is available
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle download
  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-4 md:mx-20 lg:mx-36">
          <h2 className="font-medium text-xl md:text-2xl text-center">
            Congratulations! your resume is ready
          </h2>
          <CustomParagraph className="text-center text-gray-500">
            Now you are ready to download your resume and you can share it with
            your friends
          </CustomParagraph>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-2 justify-between lg:px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>

            <Button onClick={calculateResumeScoreFromAi}>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Calculate Resume Score"
              )}
            </Button>

            <RWebShare
              data={{
                text: "This is my resume, Open the link to see it.",
                url: `${
                  import.meta.env.VITE_BASE_URL
                }/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.attributes?.firstName} ${resumeInfo?.attributes?.lastName} Resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="my-10 mx-4 md:mx-20 lg:mx-36" id="print-area">
        <ResumePreview />
      </div>

      {/* AI Result Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full h-auto max-w-[90%] mx-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-gray-800"
              onClick={closeModal}
            >
              {/* <XIcon className="w-4 md:w-6 h-4 md:h-6 border rounded-full" /> */}
              <XIcon className="w-6 md:w-8 h-6 md:h-8 border rounded-full p-1" />
            </button>

            {/* AI Generated Resume Score */}
            {aiGeneratedResumeScore ? (
              <div>
                <div className="text-center">
                  <h1 className="text-xl text-gray-700 font-bold">
                    Your Resume Score -{" "}
                    <span className="text-primary">
                      {aiGeneratedResumeScore.resume_rating}
                    </span>
                  </h1>
                  <p className="text-lg text-primary font-bold animate-pulse">
                    {aiGeneratedResumeScore.resume_type}
                  </p>
                </div>

                {/*
                 * ========================================
                 *          AI Generated Suggestions
                 * ========================================
                 */}
                {aiGeneratedResumeScore?.suggestions && (
                  <ul className="text-sm md:text-base list-disc mt-4">
                    {aiGeneratedResumeScore?.suggestions?.map(
                      (element, index) => (
                        <li key={index} className="leading-6 md:leading-7">
                          {element}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ) : (
              <p className="text-center">Loading AI response...</p>
            )}
          </div>

          {/* Close modal when clicking outside */}
          <div className="absolute inset-0" onClick={closeModal} />
        </div>
      )}
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
