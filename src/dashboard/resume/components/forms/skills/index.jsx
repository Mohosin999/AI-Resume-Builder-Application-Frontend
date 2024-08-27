import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
// Rating Related
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "../../../../../components/ui/button";
import { FileSpreadsheet, LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";

const Skills = () => {
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

  // Effect of updating resumeInfo while skillsList will changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  /**
   * ==========================================================
   *                Handler Functions - Start
   * ==========================================================
   */

  /**
   * Function to handle all changes
   */
  const handleChange = (index, name, value) => {
    // Create a shallow copy of the `skillsList` array
    const newEntries = skillsList.slice();
    // Set the value of the specified index
    newEntries[index][name] = value;
    // Set newEntries inside experience list
    setSkillsList(newEntries);
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
  const handleRemoveSkills = () => {
    setSkillsList((prev) => prev.slice(0, -1));
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

    GlobalApi.updateResumeDetails(params?.resumeId, data).then(
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
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your skills</p>

        {/*
         * ===============================================
         *            Map the Education List
         * ===============================================
         */}
        <div>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-lg p-3 mb-2"
            >
              <div>
                <label className="text-xs">Name</label>
                <Input
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(value) => handleChange(index, "rating", value)}
              />
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
              onClick={handleAddSkills}
              className="text-primary"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={handleRemoveSkills}
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

export default Skills;
