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
  return (
    <Link to={`/dashboard/resume/${resume.attributes.resumeId}/edit`}>
      {/*
       * =======================================================
       * Notebook Square box
       *
       * Click on this box and you will see your created resume
       * and you can also edit it.
       * =======================================================
       */}
      <div
        className="p-14 bg-secondary flex items-center justify-center 
      h-[280px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary"
      >
        <Notebook />
      </div>

      {/* Title */}
      <h1 className="text-center my-1">{resume.attributes.title}</h1>
    </Link>
  );
};

export default ResumeCardItem;