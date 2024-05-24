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
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-script" value="sub" />
    <button className="ql-script" value="super" />
    <button className="ql-code-block" />
  </div>
);

const QuillEditor = ({ value, onChange }) => {
  const [quillModules, setQuillModules] = useState({
    toolbar: "#toolbar",
  });

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    if (typeof window !== "undefined") {
      import("quill").then((Quill) => {
        const BlockEmbed = Quill.import("blots/block/embed");

        class Syntax extends BlockEmbed {
          static create(value) {
            let node = super.create();
            node.innerHTML = value;
            return node;
          }
          static value(node) {
            return node.innerHTML;
          }
        }

        Syntax.blotName = "syntax";
        Syntax.tagName = "pre";
        Syntax.className = "ql-syntax";
        Quill.register(Syntax, true);

        if (isMounted) {
          setQuillModules({
            toolbar: "#toolbar",
            syntax: true,
          });
        }
      });
    }

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, []);

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
