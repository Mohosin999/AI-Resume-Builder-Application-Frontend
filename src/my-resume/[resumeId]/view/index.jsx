import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import Footer from "../../../components/footer";
import AnimatedHeading from "../../../components/shared/animated-heading";
import Wrapper from "../../../components/wrapper";
import GoToTopButton from "../../../components/shared/go-to-top-button";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedResumeScore, setAiGeneratedResumeScore] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const { resumeId } = useParams();

  // Call the `getResumeInfo` function for the first time
  useEffect(() => {
    getResumeInfo();
  }, []);

  // Function to get resume information
  const getResumeInfo = useCallback(() => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res?.data?.data);
    });
  }, [resumeId]);

  // AI feature to check resume worth
  const { collectUserData, createResumeScorePrompt } = useSkillsGap(resumeInfo);

  const userData = useMemo(() => collectUserData(), [resumeInfo]);
  const PROMPT = useMemo(() => createResumeScorePrompt(userData), [userData]);

  // Function to calculate resume score from AI
  const calculateResumeScoreFromAi = useCallback(async () => {
    setLoading(true);
    const result = await AIChatSession.sendMessage(PROMPT);
    setAiGeneratedResumeScore(JSON.parse(result?.response.text()));
    setLoading(false);
    setShowModal(true);
  }, [PROMPT]);

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
      <div className="bg-[#131a25] min-h-screen pb-10 md:pb-20">
        <div id="no-print">
          <Header />

          <Wrapper>
            <div className="mb-8 md:mb-10 mx-4 md:mx-20 lg:mx-36">
              {/* <div className="mt-5 md:mt-8 mb-8 md:mb-10 mx-4 md:mx-20 lg:mx-36"> */}
              <AnimatedHeading
                text="Congratulations! Your Resume is Ready"
                className="text-center"
              />
              {/* <h2 className="font-medium text-xl md:text-2xl text-center">
            Your Resume is Ready Now.
          </h2> */}
              <CustomParagraph className="text-center text-gray-500">
                Now you are ready to download your resume and you can share it
                with your friends
              </CustomParagraph>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-2 justify-between lg:px-44 mt-4 md:my-10">
                {/* Download button */}
                <Button onClick={handleDownload}>Download</Button>

                {/* Share button */}
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

                {/* Calculate resume score button  */}
                <Button
                  className="py-0 md:w-48"
                  onClick={calculateResumeScoreFromAi}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Calculate Resume Score"
                  )}
                </Button>
              </div>
            </div>

            {/* Go to top button */}
            <GoToTopButton />
          </Wrapper>
        </div>

        {/* Resume Preview */}
        <div className="mt-3 mx-4 md:mx-20 lg:mx-36" id="print-area">
          <ResumePreview />
        </div>
      </div>

      {/* Footer Section */}
      <div id="no-print">
        <Footer />
      </div>

      {/* AI Result Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-card border border-primary p-6 rounded-lg shadow-lg w-full h-auto max-w-[90%] mx-auto relative"
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
                  <h1 className="text-xl text-primary font-bold">
                    Your Resume Score -{" "}
                    <span className="text-gray-300">
                      {aiGeneratedResumeScore.resume_rating}
                    </span>
                  </h1>
                  <p className="text-lg text-secondary font-bold animate-pulse">
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
                        <li
                          key={index}
                          className="leading-6 md:leading-7 text-gray-400"
                        >
                          {element}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-400">
                Loading AI response...
              </p>
            )}
          </div>

          {/* Close modal when clicking outside */}
          <div className="absolute inset-0" onClick={closeModal} />
        </div>
      )}
    </ResumeInfoContext.Provider>
  );
};

export default React.memo(ViewResume);
