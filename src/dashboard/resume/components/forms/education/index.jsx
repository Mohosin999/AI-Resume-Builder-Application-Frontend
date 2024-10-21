import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import { Label } from "../../../../../components/ui/label";
import FormWrapper from "../../../../../components/form-wrapper";
import CustomSaveButton from "../../../../../components/shared/custom-save-button";
import AnimatedTitle from "../../../../../components/shared/animated-title";

/**
 * Education component.
 *
 * @param {Function} setEnableNext - Function to enable or disable the next button based on form completion.
 * @returns {JSX.Element}
 */
const Education = ({ setEnableNext }) => {
  // States
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data into form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.education?.length) {
      setEducationalList(resumeInfo.attributes.education);
    }
  }, [resumeInfo]);

  /**
   * ==========================================================
   *                Handler Functions - Start
   * ==========================================================
   */

  /**
   * Function to handle all changes
   */
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setEnableNext(false);

    // Create a shallow copy of the `educationalList` array
    const newEntries = educationalList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Update the state
    setEducationalList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        education: newEntries,
      },
    });
  };

  /**
   * Function to handle adding new education
   */
  const handleAddEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  /**
   * Function to handle removing new education
   */
  const handleRemoveEducation = (indexToRemove) => {
    const newEntries = educationalList.filter(
      (_, index) => index !== indexToRemove
    );
    setEducationalList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        education: newEntries,
      },
    });

    setEnableNext(false);
  };

  /**
   * Function to handle saving related functionalities
   */
  const handleSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        setEnableNext(true);
        toast("Education Details Updated Successfully !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please Try Again !");
      }
    );
  };
  /**
   * ==========================================================
   *                Handler Functions - End
   * ==========================================================
   */

  return (
    <div>
      <FormWrapper>
        {/* Heading */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-primary text-lg">Education</h2>
        </div>
        {/* Sub Heading */}
        <CustomParagraph>Add your educational details</CustomParagraph>

        {/*
         * ===============================================
         *            Map the Education List
         * ===============================================
         */}
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="my-5 rounded-lg">
                {/* Form Heading and Remove Button */}
                <div className="flex justify-between items-center">
                  <AnimatedTitle title="Education Form" />
                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveEducation(index)}
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
                  {/* University Name */}
                  <div className="col-span-2">
                    <Label className="text-sm text-primary">
                      University Name
                    </Label>
                    <Input
                      name="universityName"
                      onChange={(event) => handleChange(event, index)}
                      value={item?.universityName}
                      placeholder="Enter Your Institution Name"
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* Degree */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">Degree</Label>
                    <Input
                      name="degree"
                      onChange={(event) => handleChange(event, index)}
                      value={item?.degree}
                      placeholder="E. g. Honors / Masters"
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* Major */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">Major</Label>
                    <Input
                      name="major"
                      onChange={(event) => handleChange(event, index)}
                      value={item?.major}
                      placeholder="E. g. CSE / EEE / Science"
                      className="bg-popover border-popover text-gray-400"
                    />
                  </div>
                  {/* Start Date */}
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-sm text-primary">Start Date</Label>
                    <Input
                      name="startDate"
                      onChange={(event) => handleChange(event, index)}
                      value={item?.startDate}
                      placeholder="Start Date"
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
                      onChange={(event) => handleChange(event, index)}
                      value={item?.endDate}
                      placeholder="End Date or Ongoing"
                      className="bg-popover border-popover text-gray-400"
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
              onClick={handleAddEducation}
              className="bg-secondary border-secondary text-[#FAFAFA] w-full"
            >
              + Add More Education
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

Education.propTypes = {
  setEnableNext: PropTypes.func.isRequired,
};

export default Education;
