import React, { useState } from "react";
import PersonalDetail from "../forms/personal-detail";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

const FormSection = () => {
  // Define index to move next or previous portion
  const [activeFormIndex, setActiveFormIndex] = useState(2);

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
      {activeFormIndex === 1 ? <PersonalDetail /> : null}

      {/* Summery */}

      {/* Experience */}

      {/* Educational Detail */}

      {/* Skills */}
    </div>
  );
};

export default FormSection;
