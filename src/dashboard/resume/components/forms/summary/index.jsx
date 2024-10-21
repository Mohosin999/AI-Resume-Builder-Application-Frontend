import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain } from "lucide-react";
import { AIChatSession } from "../../../../../../service/AIModal";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { Label } from "../../../../../components/ui/label";
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import FormWrapper from "../../../../../components/form-wrapper";
import CustomSaveButton from "../../../../../components/shared/custom-save-button";

// Prompt to create summary from AI
const PROMPT =
  "Job Title: {jobTitle}, Generate a JSON object for a resume summary tailored to different experience levels, based on the provided job title. The JSON should include 'experienceLevel' and 'summary' fields for each experience level (Fresher, Mid-Level, Experienced). Each summary should be within 4-5 lines.";

/**
 * Summary component.
 *
 * @param {Function} setEnableNext - Function to enable or disable the next button based on form completion.
 * @returns {JSX.Element}
 */
const Summary = ({ setEnableNext }) => {
  // Destructuring resume information from useContext
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // States
  const [summary, setSummary] = useState(resumeInfo?.attributes?.summary || "");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  // Get the resume id from url
  const params = useParams();

  // Effect to update the resumeInfo when summary changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo?.attributes,
        summary: summary,
      },
    });
  }, [summary]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const prompt = PROMPT.replace(
      "{jobTitle}",
      resumeInfo?.attributes?.jobTitle
    );
    const result = await AIChatSession.sendMessage(prompt);

    setAiGenerateSummeryList(Object.values(JSON.parse(result.response.text())));
    setLoading(false);
  };

  /**
   * Function to handle the saving of the resume summary
   */
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Define a data variable with the form data
    const data = {
      data: {
        summary: summary,
      },
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        setEnableNext(true);
        setLoading(false);
        toast("Summary Updated Successfully!");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <FormWrapper>
        {/* Heading and Skip Button */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg text-primary">Summary</h2>
        </div>
        {/* Sub Heading */}
        <CustomParagraph>
          If you want to create a professional resume, skip the summary section
          and focus more on the experience and projects section.
        </CustomParagraph>

        {/* Summary Form */}
        <form onSubmit={handleSave} className="mt-7">
          {/* Label and AI Button */}
          <div className="flex justify-end items-end">
            <Button
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>

          <Label className="text-sm text-[#FFFFFF]">Add Summary</Label>
          {/* Textarea */}
          <Textarea
            className="bg-popover border-popover text-gray-400"
            value={summary} // Use summary state here
            onChange={(e) => {
              setEnableNext(false); // Disable the next button when typing
              setSummary(e.target.value);
            }}
          />

          {/* Save button */}
          <div className="mt-5 flex justify-end">
            <CustomSaveButton type={"submit"} loading={loading} />
          </div>
        </form>
      </FormWrapper>

      {/*
       * ======================================
       *             AI Suggestions
       * ======================================
       */}
      <div>
        {/* Show the title after generated suggestions */}
        {aiGeneratedSummeryList && (
          <h2 className="font-bold text-primary text-lg p-5 mt-2">
            Suggestions
          </h2>
        )}
        {/* Map and Display the Result */}
        {aiGeneratedSummeryList?.map((item, index) => (
          <div
            key={index}
            className="p-5 mb-4 last:mb-0 rounded-lg shadow-md bg-card border border-card cursor-pointer"
            onClick={() => {
              // Disable the next button when an AI suggestion is clicked
              setEnableNext(false);

              // Update the summary with the selected suggestion
              setSummary(item?.summary);

              // Update the resumeInfo immediately so it's reflected in the preview
              setResumeInfo({
                ...resumeInfo,
                attributes: {
                  ...resumeInfo?.attributes,
                  summary: item?.summary, // Update the summary field
                },
              });
            }}
          >
            <h3 className="font-bold text-primary text-base mb-2">
              Experience - {item?.experienceLevel}
            </h3>
            {/* <p className="text-base text-gray-700">{item?.summary}</p> */}
            <CustomParagraph>{item?.summary}</CustomParagraph>
          </div>
        ))}
      </div>
    </div>
  );
};

Summary.propTypes = {
  setEnableNext: PropTypes.func.isRequired,
};

export default Summary;
