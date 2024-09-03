import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import RichTextEditor from "../../rich-text-editor";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";

const Experience = () => {
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
  console.log("exl ", experienceList);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data into form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.experience?.length) {
      setExperienceList(resumeInfo.attributes.experience);
    }
  }, [resumeInfo]);

  /**
   * =====================================
   * Function to handle the input changes
   * =====================================
   */
  const handleChange = (index, event) => {
    const { name, value } = event.target;

    // Create a shallow copy of the `experienceList` array
    const newEntries = experienceList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Set newEntries inside experience list

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
   * ==============================
   * Function to remove experience
   * ==============================
   */
  // const handleRemoveExperience = () => {
  //   // setExperienceList((experienceList) => experienceList.slice(0, -1));
  //   setExperienceList((prev) => prev.slice(0, -1));
  // };

  // Function to remove a specific experience
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
  const handleRichTextEditor = (e, name, index) => {
    // Create a shallow copy of the `experienceList` array
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
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
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading */}
        <h2 className="font-bold text-lg">Experience</h2>
        <p>Add your previous work experience</p>

        {/*
         * ===============================================
         *          Map the experience list
         * ===============================================
         */}
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="border p-3 my-5 rounded-lg">
                {/* Form Heading and Remove Button */}
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-blue-700">
                    Experience Form
                  </h2>
                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveExperience(index)}
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
                <div className="grid grid-cols-2 gap-3">
                  {/* Company Name */}
                  <div>
                    <label className="text-xs">Company Name</label>
                    <Input
                      name="companyName"
                      value={item?.companyName}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  {/* Title of the Position */}
                  <div>
                    <label className="text-xs">Position Title</label>
                    <Input
                      name="title"
                      value={item?.title}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  {/* City */}
                  <div>
                    <label className="text-xs">City</label>
                    <Input
                      name="city"
                      value={item?.city}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  {/* State */}
                  <div>
                    <label className="text-xs">State</label>
                    <Input
                      name="state"
                      value={item?.state}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  {/* Start Date */}
                  <div>
                    <label className="text-xs">Start Date</label>
                    <Input
                      name="startDate"
                      value={item?.startDate}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  {/* End Date */}
                  <div>
                    <label className="text-xs">End Date</label>
                    <Input
                      name="endDate"
                      value={item?.endDate}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="col-span-2">
                    {/* Work Summary */}
                    <RichTextEditor
                      index={index}
                      value={item?.workSummary}
                      onRichTextEditorChange={(event) =>
                        handleRichTextEditor(event, "workSummary", index)
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
              onClick={handleAddExperience}
              className="text-primary"
            >
              {" "}
              + Add More Experience
            </Button>
            {/* <Button
              variant="outline"
              onClick={handleRemoveExperience}
              className="text-primary"
            >
              {" "}
              - Remove
            </Button> */}
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

export default Experience;
