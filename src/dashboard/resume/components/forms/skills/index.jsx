import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import { Label } from "../../../../../components/ui/label";
import FormWrapper from "../../../../../components/form-wrapper";
import CustomSaveButton from "../../../../../components/shared/custom-save-button";

/**
 * Skills component.
 *
 * @param {Function} setEnableNext - Function to enable or disable the next button based on form completion.
 * @returns {JSX.Element}
 */
const Skills = ({ setEnableNext }) => {
  // States
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  //   const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data into form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.skills?.length) {
      setSkillsList(resumeInfo.attributes.skills);
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
  const handleChange = (index, name, value) => {
    setEnableNext(false);
    // Create a shallow copy of the `skillsList` array
    const newEntries = skillsList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Update the state
    setSkillsList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        skills: newEntries,
      },
    });
  };

  /**
   * Function to handle adding new skills
   */
  const handleAddSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  /**
   * Function to handle removing new skills
   */
  const handleRemoveSkills = (indexToRemove) => {
    const newEntries = skillsList.filter((_, index) => index !== indexToRemove);
    setSkillsList(newEntries);

    // Update resumeInfo context
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        skills: newEntries,
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
        skills: skillsList,
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
          <h2 className="font-bold text-lg">Skills</h2>
          {/* Skip Button */}
        </div>
        {/* Sub Heading */}
        <CustomParagraph>Add your skills here.</CustomParagraph>

        {/*
         * ===============================================
         *            Map the Education List
         * ===============================================
         */}
        <div>
          {skillsList?.map((item, index) => (
            <div key={index} className="rounded-lg mb-2 my-5">
              <div>
                <Label className="text-sm">Name</Label>
                <div className="flex justify-between items-center gap-2">
                  <Input
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="w-full"
                    defaultValue={item?.name}
                  />
                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveSkills(index)}
                    className="text-red-500"
                  >
                    - Remove
                  </Button>
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
        <div className="flex flex-col md:flex-row justify-between gap-2 mt-5">
          {/* Add and Remove Experience Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddSkills}
              className="text-primary w-full"
            >
              + Add More Skills
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

Skills.propTypes = {
  setEnableNext: PropTypes.func.isRequired,
};

export default Skills;
