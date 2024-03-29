import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextEditor({
  placeholder,
  value,
  changeHandler,
  readOnly = false,
  onfocus,
}) {
  return (
    <ReactQuill
      placeholder={placeholder}
      theme="snow"
      value={value}
      onChange={changeHandler}
      readOnly={readOnly}
      {...(onfocus ? { onFocus: onfocus } : {})}
      preserveWhitespace={true}
    />
  );
}

export default RichTextEditor;
