import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../../service/AIModal";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";

// Prompt to create summary from AI
const PROMPT =
  "Job Title: {jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience Level and summary with Experience level for Fresher, Mid-Level and Experienced";

/**
 * summary Component
 *
 * @param {Function} setEnableNext - It will be a function
 * @returns {JSX.Element}
 */
const Summary = ({ setEnableNext, activeFormIndex, setActiveFormIndex }) => {
  // Destructuring resume information from useContext
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // States
  const [summary, setSummary] = useState(resumeInfo?.attributes?.summary || "");
  const [loading, setLoading] = useState(false);

  // Get the resume id from url
  const params = useParams();

  // Effect to update the resumeInfo when summary will change
  useEffect(() => {
    // summary &&
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo?.attributes,
        summary: summary,
      },
    });
  }, [summary]);

  /**
   * ====================================================
   * Function to handle the saving of the resume summary
   * ====================================================
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
        toast("summary Updated Successfully!");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading and Skip Button */}
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Summary</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Skip
          </Button>
        </div>
        {/* Sub Heading */}
        <p>Here you can add or skip your summary</p>

        {/*
         * =====================================================
         *                   summary Form
         * =====================================================
         */}
        <form onSubmit={handleSave} className="mt-7">
          <div>
            <label>Add summary</label>
          </div>

          {/* Textarea */}
          <Textarea
            className="mt-5"
            defaultValue={resumeInfo?.attributes?.summary}
            // onChange={(e) => setSummary(e.target.value)}
            onChange={(e) => {
              setEnableNext(false);
              setSummary(e.target.value);
            }}
          />

          {/* Save button */}
          <div className="mt-2 flex justify-end">
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Summary;
