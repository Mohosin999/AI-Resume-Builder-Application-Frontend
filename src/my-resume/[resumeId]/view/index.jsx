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
import { Loader2Icon, XIcon } from "lucide-react"; // Lucide XIcon for close button

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

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
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

            <Button onClick={calculateResumeScoreFromAi}>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Check How Much Professional Your Resume Is"
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
      <div className="my-10 mx-10 md:mx-20 lg:mx-36" id="print-area">
        <ResumePreview />
      </div>

      {/* AI Result Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* AI Generated Resume Score */}
            {aiGeneratedResumeScore ? (
              <div>
                <h1 className="text-xl font-bold">
                  Your Resume Score: {aiGeneratedResumeScore.resume_rating}
                </h1>
                <p className="mt-2">
                  Resume Type: {aiGeneratedResumeScore.resume_type}
                </p>
                {aiGeneratedResumeScore?.suggestions && (
                  <ul className="list-disc pl-5 mt-4">
                    {aiGeneratedResumeScore?.suggestions?.map(
                      (element, index) => (
                        <li key={index}>{element}</li>
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
