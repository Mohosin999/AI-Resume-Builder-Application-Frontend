import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";
import { Loader2, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "../../../../service/GlobalApi";

const AddResume = () => {
  // States
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);

  // Destructuring user from userUser hook
  const { user } = useUser();
  // Navigation variable from useNavigate hook to go to another page
  const navigation = useNavigate();

  /**
   * Asynchronous function to handle the creation of a new resume
   */
  const handleCreate = async () => {
    // Set loading state to true to indicate that the process is ongoing
    setLoading(true);

    // Generate a unique identifier (UUID) for the new resume
    const uuid = uuidv4();

    /**
     * Prepare the data to be sent in the API request
     * Why the data format like this?
     * Some APIs expect the payload to be wrapped inside a specific property,
     * like data.
     */
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    // Create new resume
    GlobalApi.CreateNewResume(data).then(
      (res) => {
        // Set loading state to false once the resume is successfully created
        if (res) {
          console.log(res);

          setLoading(false);
          navigation(`/dashboard/resume/${res?.data?.data.id}/edit`);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      {/*
       * ==============================================
       * Plus Square box
       *
       * Clicking this box will open a dialog.
       * ==============================================
       */}
      <div
        onClick={() => setOpenDialog(true)}
        className="p-14 py-24 border flex justify-center items-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <PlusSquare />
      </div>

      {/*
       * =============================================
       * Dialog box
       *
       * Here you can add information for your resume.
       * =============================================
       */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>

            {/* Input box */}
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="my-2"
                placeholder="Ex.Frontend Developer"
              />
            </DialogDescription>

            {/* Dialog buttons (cancel and create) */}
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              {/* If resume title is not exist, button will be disabled */}
              <Button
                onClick={() => handleCreate()}
                disabled={!resumeTitle || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
