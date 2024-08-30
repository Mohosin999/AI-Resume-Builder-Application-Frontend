import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";

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

  // Effect of updating resumeInfo while educationalList will changes
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
  const handleRemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1));
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
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading */}
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>

        {/*
         * ===============================================
         *            Map the Education List
         * ===============================================
         */}
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                {/* University Name */}
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.universityName}
                  />
                </div>
                {/* Degree */}
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.degree}
                  />
                </div>
                {/* Major */}
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.major}
                  />
                </div>
                {/* Start Date */}
                <div>
                  <label>Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.startDate}
                  />
                </div>
                {/* End Date */}
                <div>
                  <label>End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.endDate}
                  />
                </div>
                {/* Description */}
                <div className="col-span-2">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    onChange={(event) => handleChange(event, index)}
                    defaultValue={item?.description}
                  />
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
              onClick={handleAddEducation}
              className="text-primary"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={handleRemoveEducation}
              className="text-primary"
            >
              - Remove
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

export default Education;
