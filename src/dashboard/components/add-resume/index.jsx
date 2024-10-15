import React, { useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";
import { Loader2, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "../../../../service/GlobalApi";
import CustomParagraph from "../../../components/ui/CustomParagraph";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigation = useNavigate();

  // Ref for the dialog content to detect clicks outside
  const dialogRef = useRef(null);

  const handleCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data).then(
      (res) => {
        if (res) {
          setLoading(false);
          navigation(`/dashboard/resume/${res?.data?.data.id}/edit`);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // Handle click outside dialog to close it
  const handleOutsideClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      setOpenDialog(false);
    }
  };

  return (
    <div>
      {/* Plus Square to trigger dialog */}
      <div
        onClick={() => setOpenDialog(true)}
        className="p-14 py-24 border flex justify-center items-center bg-secondary rounded-lg h-[270px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <PlusSquare />
      </div>

      {/* Custom Dialog */}
      {openDialog && (
        <div
          onClick={handleOutsideClick} // Close dialog when clicking outside
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            ref={dialogRef}
            className="bg-white rounded-md p-6 w-full max-w-[90%] sm:max-w-[600px] shadow-lg"
          >
            <h2 className="text-lg md:text-xl font-semibold">
              Create New Resume
            </h2>
            <CustomParagraph>Add a title for your new resume</CustomParagraph>
            <Input
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="my-2"
              placeholder="Ex. Frontend Developer"
            />

            {/* Dialog buttons */}
            <div className="flex justify-end gap-5 mt-4">
              <Button
                onClick={() => setOpenDialog(false)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!resumeTitle || loading}
                size="sm"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResume;
