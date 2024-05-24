import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-header" value="1">
      Header 1
    </button>
    <button className="ql-header" value="2">
      Header 2
    </button>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-link" />
    <button className="ql-script" value="sub" />
    <button className="ql-script" value="super" />
    <button className="ql-code-block" />
  </div>
);

const QuillEditor = ({ value, onChange }) => {
  const [quillModules, setQuillModules] = useState({ toolbar: "#toolbar" });

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={quillModules}
      />
    </div>
  );
};

export default QuillEditor;
