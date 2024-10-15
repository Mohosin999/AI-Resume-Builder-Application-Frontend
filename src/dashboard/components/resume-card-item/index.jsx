import React, { useState } from "react";
import PropTypes from "prop-types";
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
 * ResumeCardItem component that displays an individual resume card and handles data refresh functionality.
 *
 * @param {Object} resume - The resume data to be displayed in the card.
 * @param {Function} refreshData - Function to refresh the resume data when necessary.
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
    <div>
      {/*
       * =======================================================
       * Notebook Square box
       *
       * Click on this box and you will see your created resume
       * and you can also edit it.
       * =======================================================
       */}
      <Link to={`/dashboard/resume/${resume.id}/edit`}>
        <div
          className="p-14 py-24 border flex justify-center items-center bg-secondary rounded-lg h-[270px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
          style={{ backgroundColor: themeColor }}
        >
          <Notebook />
        </div>
      </Link>

      {/* Resume title and drop down menu */}
      <div className="flex items-start justify-between">
        {/* Title */}
        <h1 className="text-center my-1">{resume.attributes.title}</h1>
        {/*
         * ======================================
         *            Dropdown menu
         * ======================================
         */}
        <div className="mt-[7px]">
          <DropdownMenu>
            {/* Trigger button */}
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  navigation(`/dashboard/resume/${resume.id}/edit`)
                }
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
        </div>
      </div>

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
    </div>
  );
};

ResumeCardItem.propTypes = {
  resume: PropTypes.object.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default ResumeCardItem;
