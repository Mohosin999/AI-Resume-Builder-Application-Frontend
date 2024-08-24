import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";

const Summery = ({ setEnableNext }) => {
  // States
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);

  // Destructuring resume information from useContext
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the resume id from url
  const params = useParams();

  // Effect to update the resumeInfo when summery will change
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  /**
   * ====================================================
   * Function to handle the saving of the resume summery.
   * ====================================================
   */
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Define a data variable with the form data
    const data = {
      data: {
        summery: summery,
      },
    };

    GlobalApi.updateResumeDetails(params?.resumeId, data).then(
      (res) => {
        setEnableNext(true);
        setLoading(false);
        toast("Summery Updated Successfully!");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
        {/* Heading */}
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add summery for your job title</p>

        {/*
         * =====================================================
         *                   Summery Form
         * =====================================================
         */}
        <form onSubmit={handleSave} className="mt-7">
          {/* Generate from AI button */}
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              size="sm"
              variant="outline"
              type="button"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="w-4 h-4" /> Generate from AI
            </Button>
          </div>

          {/* Textarea */}
          <Textarea
            className="mt-5"
            required
            onChange={(e) => setSummery(e.target.value)}
          />

          {/* Save button */}
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Summery;
