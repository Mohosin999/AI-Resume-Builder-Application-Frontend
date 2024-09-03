import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

const RichTextEditor = ({ onRichTextEditorChange, value }) => {
  const [content, setContent] = useState(value);
  const editor = useRef(null);

  // Set value when `defaultValue` value changes
  useEffect(() => {
    setContent(value);
  }, [value]);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        // config={config}
        // tabIndex={1} // tabIndex of textarea
        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          setContent(newContent);
          onRichTextEditorChange(newContent);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
