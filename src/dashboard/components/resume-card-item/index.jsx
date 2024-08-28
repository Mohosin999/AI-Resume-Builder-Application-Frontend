import React from "react";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Resume Card Item
 *
 * @param {Object} resume - Resume will be an object.
 * @returns {JSX.Element}
 */
const ResumeCardItem = ({ resume }) => {
  // Get the theme color
  const themeColor = resume?.attributes?.themeColor;

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
    </Link>
  );
};

export default ResumeCardItem;
