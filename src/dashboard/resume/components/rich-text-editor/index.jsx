import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles for snow theme

/**
 * RichTextEditor component that provides a rich text editor interface.
 *
 * @param {Function} onRichTextEditorChange - Callback function triggered when the editor content changes.
 * @param {string} value - The current content of the editor.
 * @returns {JSX.Element}
 */
const RichTextEditor = ({ onRichTextEditorChange, value }) => {
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
        style={{
          backgroundColor: "var(--popover-bg)",
          borderColor: "var(--popover-border)",
          color: "#9ca3af",
        }}
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

RichTextEditor.propTypes = {
  onRichTextEditorChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RichTextEditor;
