import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import * as Emoji from "quill-emoji"
import "quill-emoji/dist/quill-emoji.css"
const Font = Quill.import("formats/font")
Font.whitelist = [
  "Mono",
  "Grotesk",
  "Hanson",
  "Roboto",
  "Raleway",
  "Montserrat",
  "Lato",
  "Rubik",
]
Quill.register(Font, true)
Quill.register("modules/emoji", Emoji)
const modules = {
  toolbar: {
    container: [
      [{ font: Font.whitelist }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        {
          color: [
            "#000000",
            "#0063e2",
            "#f6331c",
            "#ee93b5",
            "#d7fb03",
            "#ffffff",
            "#ffffff",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#000000",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "#222222",
          ],
        },
        {
          background: [
            "#000000",
            "#0063e2",
            "#f6331c",
            "#ee93b5",
            "#d7fb03",
            "#ffffff",
            "#ffffff",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#000000",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "#222222",
          ],
        },
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
      ],
      [{ size: ["small", false, "large", "huge"] }],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["emoji"],
      ["clean"],
    ],
  },
  "emoji-toolbar": true,
  "emoji-textarea": true,
  "emoji-shortname": true,
}
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "background",
  "color",
  "emoji",
]
const QuillEditor = ({ placeholder, articleContent, onEditorChange }) => {
  return (
    <div>
      <ReactQuill
        theme={"snow"}
        onChange={onEditorChange}
        modules={modules}
        formats={formats}
        value={articleContent}
        placeholder={placeholder}
      />
    </div>
  )
}

export default QuillEditor
