import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import GlobalApi from "../../../../../../service/GlobalApi";
import RichTextEditor from "../../rich-text-editor";
import { Label } from "../../../../../components/ui/label";

const GithubContribution = ({
  setEnableNext,
  activeFormIndex,
  setActiveFormIndex,
}) => {
  // States
  const [contributionList, setContributionList] = useState([
    {
      repositoryName: "",
      workSummary: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data within form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.githubContribution?.length) {
      setContributionList(resumeInfo?.attributes?.githubContribution);
    }
  }, [resumeInfo]);

  /**
   * =====================================
   * Function to handle the input changes
   * =====================================
   */
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setEnableNext(false);

    // Create a shallow copy of the `projectsList` array
    const newEntries = contributionList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Update the state
    setContributionList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        githubContribution: newEntries,
      },
    });
  };

  /**
   * ===============================
   * Function to add new experience
   * ===============================
   */
  const handleAddProjects = () => {
    setContributionList([
      ...contributionList,
      {
        repositoryName: "",
        workSummary: "",
      },
    ]);
  };

  /**
   * =========================================
   * Function to remove a specific experience
   * =========================================
   */
  const handleRemoveProjects = (indexToRemove) => {
    const newEntries = contributionList.filter(
      (_, index) => index !== indexToRemove
    );
    setContributionList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        githubContribution: newEntries,
      },
    });
  };

  /**
   * ================================================
   * Function to handle the saving of the experience
   * ================================================
   */
  const handleSave = () => {
    setLoading(true);
    const data = {
      data: {
        githubContribution: contributionList,
      },
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        setEnableNext(true);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  /**
   * ====================================
   * Function to handle rich text editor
   * ====================================
   */
  const handleRichTextEditor = (newContent, name, index) => {
    setEnableNext(false);
    // Create a shallow copy of the `projectsList` array
    const newEntries = contributionList.slice();
    newEntries[index][name] = newContent;
    // Set newEntries inside experience list
    setContributionList(newEntries);

    // Update resumeInfo context when I update rich_text_editor
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        githubContribution: newEntries,
      },
    });
  };

  return (
    <div>
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading and Skip Button */}
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">GitHub Contribution</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Clear the github contribution list
              setContributionList([
                {
                  repositoryName: "",
                  workSummary: "",
                },
              ]);

              // Update resumeInfo with empty experience data
              setResumeInfo({
                ...resumeInfo,
                attributes: {
                  ...resumeInfo?.attributes,
                  githubContribution: [], // Clear projects in resumeInfo
                },
              });

              setActiveFormIndex(activeFormIndex + 1);
              setEnableNext(true);
            }}
          >
            Skip
          </Button>
        </div>
        {/* Sub Heading */}
        <p className="mt-1">Add your repository where you contributed</p>

        {/*
         * ===============================================
         *          Map the experience list
         * ===============================================
         */}
        <div>
          {contributionList.map((item, index) => (
            <div key={index}>
              <div className="my-5 rounded-lg">
                {/* Form Heading and Remove Button */}
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-blue-700">
                    GitHub Contribution Form
                  </h2>
                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveProjects(index)}
                    className="text-primary"
                  >
                    - Remove
                  </Button>
                </div>

                {/*
                 * ========================================
                 *           Information Fields
                 * ========================================
                 */}
                <div className="grid grid-cols-1 gap-3">
                  {/* Company Name */}
                  <div>
                    <Label className="text-sm">Repository Name</Label>
                    <Input
                      name="repositoryName"
                      value={item?.repositoryName}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  {/* Work Summary */}
                  <div>
                    <Label className="text-sm">
                      Add Your Contribution Details
                    </Label>
                    <RichTextEditor
                      index={index}
                      value={item?.workSummary}
                      onRichTextEditorChange={(newContent) =>
                        handleRichTextEditor(newContent, "workSummary", index)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*
         * ===============================================
         *                    Buttons
         * ===============================================
         */}
        <div className="flex justify-between">
          {/* Add and Remove Experience Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleAddProjects}
              className="text-primary"
            >
              {" "}
              + Add More Projects
            </Button>
          </div>

          {/* Button to Save Experience */}
          <Button disabled={loading} onClick={() => handleSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GithubContribution;
