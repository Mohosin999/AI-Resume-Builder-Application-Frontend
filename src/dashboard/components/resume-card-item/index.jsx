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
  console.log(resume);

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
        className="p-14 bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center 
      h-[280px] border-t-4 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary"
        style={{ borderColor: "green" }}
      >
        <Notebook />
      </div>

      {/* Title */}
      <h1 className="text-center my-1">{resume.attributes.title}</h1>
    </Link>
  );
};

export default ResumeCardItem;
