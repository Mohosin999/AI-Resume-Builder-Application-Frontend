import React from "react";
import { MoreVertical, Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Dropdown menu related
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Resume Card Item
 *
 * @param {Object} resume - Resume will be an object.
 * @returns {JSX.Element}
 */
const ResumeCardItem = ({ resume }) => {
  // Get the theme color
  const themeColor = resume?.attributes?.themeColor;

  const navigation = useNavigate();

  /**
   * Function to handle event after menu click
   */
  // const handleMenuClick=(url)=>{
  //   navigation(url)
  // }

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
      {/* Dropdown menu */}
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
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Download</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
};

export default ResumeCardItem;
