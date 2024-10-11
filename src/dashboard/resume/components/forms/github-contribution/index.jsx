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
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import FormWrapper from "../../../../../components/form-wrapper";
import CustomSaveButton from "../../../../../components/shared/custom-save-button";

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

    setEnableNext(false);
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
      <FormWrapper>
        {/* Heading and Skip Button */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">GitHub Contribution</h2>
        </div>
        {/* Sub Heading */}
        <CustomParagraph>
          Add your repository where you contributed.
        </CustomParagraph>

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
        <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
          {/* Add and Remove Experience Buttons */}
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddProjects}
              className="text-primary w-full"
            >
              {" "}
              + Add More Projects
            </Button>
          </div>

          {/* Button to Save Experience */}
          {/* <Button disabled={loading} onClick={() => handleSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button> */}
          <CustomSaveButton loading={loading} handleSave={handleSave} />
        </div>
      </FormWrapper>
    </div>
  );
};

export default GithubContribution;
