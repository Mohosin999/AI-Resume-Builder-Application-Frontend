import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import GlobalApi from "../../../../../../service/GlobalApi";
import RichTextEditor from "../../rich-text-editor";

const Achievements = ({
  setEnableNext,
  activeFormIndex,
  setActiveFormIndex,
}) => {
  // States
  const [achievementList, setAchievementList] = useState([
    {
      achievementSummary: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the specific id
  const params = useParams();

  // Load existing experience data within form fields
  useEffect(() => {
    if (resumeInfo?.attributes?.achievements?.length) {
      setAchievementList(resumeInfo?.attributes?.achievements);
    }
  }, [resumeInfo]);

  /**
   * ================================================
   * Function to handle the saving of the experience
   * ================================================
   */
  const handleSave = () => {
    setLoading(true);
    const data = {
      data: {
        achievements: achievementList,
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
    const newEntries = achievementList.slice();
    newEntries[index][name] = newContent;
    // Set newEntries inside experience list
    setAchievementList(newEntries);

    // Update resumeInfo context when I update rich_text_editor
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo.attributes,
        achievements: newEntries,
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
              // Clear the github contribution list
              setAchievementList([
                {
                  achievementSummary: "",
                },
              ]);

              // Update resumeInfo with empty experience data
              setResumeInfo({
                ...resumeInfo,
                attributes: {
                  ...resumeInfo?.attributes,
                  achievements: [], // Clear projects in resumeInfo
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

        {/*
         * ===============================================
         *          Map the experience list
         * ===============================================
         */}
        <div>
          {achievementList.map((item, index) => (
            <div key={index}>
              <div className="my-5">
                {/* <div className="border p-3 my-5 rounded-lg"> */}
                {/*
                 * ========================================
                 *           Information Fields
                 * ========================================
                 */}
                <div className="grid grid-cols-1 gap-3">
                  {/* Work Summary */}
                  <div>
                    <RichTextEditor
                      index={index}
                      value={item?.achievementSummary}
                      onRichTextEditorChange={(newContent) =>
                        handleRichTextEditor(
                          newContent,
                          "achievementSummary",
                          index
                        )
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
         *                  Save Button
         * ===============================================
         */}
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
