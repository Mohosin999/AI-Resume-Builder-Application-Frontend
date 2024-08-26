import React, { useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { LoaderCircle } from "lucide-react";

const Education = () => {
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

  /**
   * ==========================================================
   *                Handler Functions - Start
   * ==========================================================
   */
  const handleChange = (e, index) => {};

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
  const handleSave = () => {};
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

        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                {/* University Name */}
                <div>
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                {/* Degree */}
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                {/* Major */}
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                {/* Start Date */}
                <div>
                  <label>Start Date</label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                {/* End Date */}
                <div>
                  <label>End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
                {/* Description */}
                <div className="col-span-2">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    onChange={(event) => handleChange(event, index)}
                  />
                </div>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
