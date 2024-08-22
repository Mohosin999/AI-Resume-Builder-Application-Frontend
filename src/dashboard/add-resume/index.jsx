import React, { useState } from "react";
import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../../service/GlobalApi";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Destructuring user from userUser hook

  /**
   * Asynchronous function to handle the creation of a new resume
   */
  const handleCreate = async () => {
    // Set loading state to true to indicate that the process is ongoing
    setLoading(true);

    // Generate a unique identifier (UUID) for the new resume
    const uuid = uuidv4();

    // Prepare the data to be sent in the API request
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    // Make an API request to create the new resume using the GlobalApi's CreateNewResume function
    GlobalApi.CreateNewResume(data).then(
      (res) => {
        console.log(res); // Log the response from the API
        if (res) {
          setLoading(false); // Set loading state to false once the resume is successfully created
        }
      },
      (error) => {
        setLoading(false); // Set loading state to false in case of an error
        // Additional error handling can be done here if needed
      }
    );
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-14 py-24 border flex justify-center items-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="my-2"
                placeholder="Ex.Frontend Developer"
              />
            </DialogDescription>

            {/* Buttons */}
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
