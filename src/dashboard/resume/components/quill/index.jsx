import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles for snow theme

const Quill = ({ onRichTextEditorChange, value }) => {
  const [content, setContent] = useState(value);

  // Synchronize the prop `value` with the local state `content`
  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (value) => {
    setContent(value);
    onRichTextEditorChange(value); // Send the updated content back to the parent if necessary
  };

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"], // remove formatting button
    ],
  };

  // Quill formats configuration
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "align",
    "color",
    "background",
  ];

  return (
    <div>
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        theme="snow"
      />
      {/* Additional styles for the editor content */}
      <style>
        {`
          .ql-editor {
            min-height: 150px; /* Set the min-height for the content area */
          }
        `}
      </style>
    </div>
  );
};

export default Quill;
