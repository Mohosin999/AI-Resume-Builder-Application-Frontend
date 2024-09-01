import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

import { AIChatSession } from "../../../../../service/AIModal";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Button } from "../../../../components/ui/button";

// Prompt to create summary from AI
const PROMPT =
  "position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags";

/**
 * Rich Text Editor Component
 *
 * @param {*} param0
 * @returns
 */
const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  // States
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  // Destructuring resume related information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Set value when `defaultValue` value changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  /**
   * ================================================
   * Asynchronous function to create summary from AI
   * ================================================
   */
  const GenerateSummaryFromAI = async () => {
    // Check if there is no experience title, add it first
    if (!resumeInfo?.experience[index].title) {
      toast("Please Add Position Title");
      return;
    }

    // If title exist, now start your work
    setLoading(true);

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo?.experience[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);
    // const res = JSON.parse(result.response.text());
    const res = result.response.text();

    setValue(res.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      {/*
       * ===============================================
       *           Label and Button
       * ===============================================
       */}
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      {/*
       * ===============================================
       *          Rich Text Functionalities
       * ===============================================
       */}
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
