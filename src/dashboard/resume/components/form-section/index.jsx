import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import PersonalDetail from "../forms/personal-detail";
import Summary from "../forms/summary";
import Experience from "../forms/experience";
import Projects from "../forms/projects";
import GithubContribution from "../forms/github-contribution";
import Achievements from "../forms/achievements";
import Education from "../forms/education";
import Skills from "../forms/skills";
import ThemeColor from "../theme-color";

const FormSection = () => {
  // Define index to move next or previous portion
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div className="mt-3 md:mt-0">
      {/*
       * ==========================================================
       *                 Form's above buttons
       * ==========================================================
       */}
      <div className="flex items-center justify-between">
        {/* Icon Buttons */}
        <div className="flex gap-2">
          {/* Home Button */}
          <Link to={"/"}>
            <Button size="sm">
              <Home />
            </Button>
          </Link>
          {/* Theme color component */}
          <ThemeColor />
        </div>

        {/* Previous & Next buttons */}
        <div className="flex gap-2">
          {/* If index is greater than 1, only then show the previous button */}
          {activeFormIndex > 1 && (
            <Button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className=""
              size="sm"
            >
              <ArrowLeft />
            </Button>
          )}

          <Button
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/*
       * ==========================================================
       *                           Form
       * ==========================================================
       */}
      {/* Personal Detail */}
      {/* {activeFormIndex === 1 ? <PersonalDetail /> : null} */}
      {activeFormIndex === 1 ? (
        <PersonalDetail setEnableNext={setEnableNext} />
      ) : activeFormIndex === 2 ? (
        <Summary
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 3 ? (
        <Experience
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 4 ? (
        <Projects
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 5 ? (
        <GithubContribution
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 6 ? (
        <Achievements
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 7 ? (
        <Education
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 8 ? (
        <Skills
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 9 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
};

export default FormSection;
