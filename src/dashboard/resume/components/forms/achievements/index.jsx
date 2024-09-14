import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Button } from "../../../../../components/ui/button";
import GlobalApi from "../../../../../../service/GlobalApi";
import RichTextEditor from "../../rich-text-editor";

const Achievements = ({
  setEnableNext,
  activeFormIndex,
  setActiveFormIndex,
}) => {
  // Initialize achievementList as a string
  const [achievementList, setAchievementList] = useState("");
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing achievements data within form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.achievements) {
      setAchievementList(resumeInfo.attributes.achievements);
    }
  }, [resumeInfo]);

  /**
   * ================================================
   * Function to handle the saving of the achievements
   * ================================================
   */
  const handleSave = () => {
    setLoading(true);

    // Prepare the data for the update
    const data = {
      data: {
        achievements: achievementList, // Save as a string
      },
    };

    console.log("Resume ID: ", params?.resumeId); // Check if the resumeId exists
    console.log("Data to save: ", data); // Check the data being sent

    GlobalApi.UpdateResumeDetails(params?.resumeId, data)
      .then((res) => {
        setLoading(false);
        setEnableNext(true);
        toast("Details updated !");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error response data: ", error.response.data);
      });
  };

  /**
   * ====================================
   * Function to handle rich text editor
   * ====================================
   */
  const handleRichTextEditor = (newContent) => {
    setEnableNext(false);
    setAchievementList(newContent);

    // Update resumeInfo context when updating rich_text_editor
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        achievements: newContent, // Update the string content in resumeInfo
      },
    });
  };

  return (
    <div>
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading and Skip Button */}
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Achievements</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Clear the achievement list (as a string)
              setAchievementList("");

              // Update resumeInfo with empty achievements
              setResumeInfo({
                ...resumeInfo,
                attributes: {
                  ...resumeInfo?.attributes,
                  achievements: "", // Clear achievements in resumeInfo
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
        <p>Add your achievements</p>

        {/* Rich Text Editor for achievements */}
        <div className="my-5">
          <RichTextEditor
            value={achievementList} // Bind string value
            onRichTextEditorChange={handleRichTextEditor}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button disabled={loading} onClick={() => handleSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
