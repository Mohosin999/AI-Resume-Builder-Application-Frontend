import React, { useState } from "react";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import PersonalDetail from "../forms/personal-detail";
import { Button } from "../../../../components/ui/button";
import Summary from "../forms/summary";
import Experience from "../forms/experience";
import Education from "../forms/education";
import Skills from "../forms/skills";
import Projects from "../forms/projects";
import GithubContribution from "../forms/github-contribution";

const FormSection = () => {
  // Define index to move next or previous portion
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);

  return (
    <div>
      {/*
       * ==========================================================
       *                 Form's above buttons
       * ==========================================================
       */}
      <div className="flex items-center justify-between">
        {/* Layout button */}
        <Button variant="outline" className="flex gap-2" size="sm">
          <LayoutGrid /> Theme
        </Button>

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
        <Education
          setEnableNext={setEnableNext}
          activeFormIndex={activeFormIndex}
          setActiveFormIndex={setActiveFormIndex}
        />
      ) : activeFormIndex === 7 ? (
        <Skills setEnableNext={setEnableNext} />
      ) : null}

      {/* Summery */}

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  );
};

export default FormSection;
