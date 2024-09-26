import React, { useState } from "react";
import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "../../../../service/GlobalApi";
// Dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Alert dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Resume Card Item
 *
 * @param {Object} resume - Resume will be an object.
 * @returns {JSX.Element}
 */
const ResumeCardItem = ({ resume, refreshData }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get the theme color
  const themeColor = resume?.attributes?.themeColor;

  const navigation = useNavigate();

  /**
   * Function to handle delete functionality
   */
  const handleDelete = () => {
    setLoading(true);

    GlobalApi.DeleteResumeById(resume.id).then(
      (res) => {
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <Link to={`/dashboard/resume/${resume.id}/edit`}>
      {/*
       * =======================================================
       * Notebook Square box
       *
       * Click on this box and you will see your created resume
       * and you can also edit it.
       * =======================================================
       */}
      <div
        className="p-14 flex items-center justify-center h-[280px] border rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary"
        style={{ backgroundColor: themeColor }}
      >
        <Notebook />
      </div>

      {/* Title */}
      <h1 className="text-center my-1">{resume.attributes.title}</h1>
      {/*
       * ======================================
       *            Dropdown menu
       * ======================================
       */}
      <DropdownMenu>
        {/* Trigger button */}
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4 cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => navigation(`/dashboard/resume/${resume.id}/edit`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigation(`/my-resume/${resume.id}/view`)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigation(`/my-resume/${resume.id}/view`)}
          >
            Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenAlert(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*
       * ======================================
       *            Alert Dialog
       * ======================================
       */}
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Link>
  );
};

export default ResumeCardItem;
