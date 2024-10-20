import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import GlobalApi from "../../../../../../service/GlobalApi";
import RichTextEditor from "../../rich-text-editor";
import { Label } from "../../../../../components/ui/label";
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import CustomSaveButton from "../../../../../components/shared/custom-save-button";
import FormWrapper from "../../../../../components/form-wrapper";
import AnimatedTitle from "../../../../../components/shared/animated-title";

/**
 * Experience component.
 *
 * @param {Function} setEnableNext - Function to enable or disable the next button based on form completion.
 * @returns {JSX.Element}
 */
const Experience = ({ setEnableNext }) => {
  // States
  const [experienceList, setExperienceList] = useState([
    {
      companyName: "",
      title: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      workSummary: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data into form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.experience?.length) {
      setExperienceList(resumeInfo?.attributes?.experience);
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

    // Create a shallow copy of the `experienceList` array
    const newEntries = experienceList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Update the state
    setExperienceList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        experience: newEntries,
      },
    });
  };

  /**
   * ===============================
   * Function to add new experience
   * ===============================
   */
  const handleAddExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        companyName: "",
        title: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  /**
   * =========================================
   * Function to remove a specific experience
   * =========================================
   */
  const handleRemoveExperience = (indexToRemove) => {
    const newEntries = experienceList.filter(
      (_, index) => index !== indexToRemove
    );
    setExperienceList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        experience: newEntries,
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
        experience: experienceList,
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
    // Create a shallow copy of the `experienceList` array
    const newEntries = experienceList.slice();
    newEntries[index][name] = newContent;
    // Set newEntries inside experience list
    setExperienceList(newEntries);

    // Update resumeInfo context when I update rich_text_editor
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        experience: newEntries,
      },
    });
  };

  return (
    <div>
      <FormWrapper>
        {/* Heading and Skip Button */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-primary text-lg">Experience</h2>
        </div>
        {/* Sub Heading */}
        <CustomParagraph>Add your work experience here.</CustomParagraph>

        {/*
         * ===============================================
         *          Map the experience list
         * ===============================================
         */}
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="my-5 rounded-lg">
                {/* Form Heading and Remove Button */}
                <div className="flex justify-between items-center">
                  <AnimatedTitle title="Experience Form" />
                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveExperience(index)}
                    className="bg-red-500 border-red-500 text-[#FAFAFA]"
                  >
                    - Remove
                  </Button>
                </div>

                {/*
                 * ========================================
                 *           Information Fields
                 * ========================================
                 */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Company Name */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">Company Name</Label>
                    <Input
                      name="companyName"
                      value={item?.companyName}
                      placeholder="E. g. Toptal"
                      onChange={(event) => handleChange(index, event)}
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* Title of the Position */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">
                      Position Title
                    </Label>
                    <Input
                      name="title"
                      value={item?.title}
                      placeholder="E. g. Frontend Developer"
                      onChange={(event) => handleChange(index, event)}
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* City */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">City</Label>
                    <Input
                      name="city"
                      value={item?.city}
                      placeholder="City Name"
                      onChange={(event) => handleChange(index, event)}
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* State */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">State</Label>
                    <Input
                      name="state"
                      value={item?.state}
                      placeholder="E. g. USA"
                      onChange={(event) => handleChange(index, event)}
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* Start Date */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">Start Date</Label>
                    <Input
                      name="startDate"
                      value={item?.startDate}
                      placeholder="Date When You Got the Job"
                      onChange={(event) => handleChange(index, event)}
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* End Date */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">
                      End Date / Ongoing
                    </Label>
                    <Input
                      name="endDate"
                      value={item?.endDate}
                      placeholder="End Date or Ongoing"
                      onChange={(event) => handleChange(index, event)}
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* Work Summary */}
                  <div className="col-span-2">
                    {/* Label */}
                    <Label className="text-sm text-primary">
                      Experience Details
                    </Label>
                    {/* Text Editor */}
                    <RichTextEditor
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
              onClick={handleAddExperience}
              className="bg-secondary border-secondary text-[#FAFAFA] w-full"
            >
              {" "}
              + Add More Experience
            </Button>
          </div>

          <CustomSaveButton loading={loading} handleSave={handleSave} />
        </div>
      </FormWrapper>
    </div>
  );
};

Experience.propTypes = {
  setEnableNext: PropTypes.func.isRequired,
};

export default Experience;
