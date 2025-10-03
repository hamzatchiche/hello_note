import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "./navbar";

export default function EditNote({ notes, setNotes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state;
  const editRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (editRef.current) {
      editRef.current.innerText = note.content;
    }
  }, [note]);

  const handleSave = () => {
    if (!editRef.current) return;
    const updatedContent = editRef.current.innerText;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, content: updatedContent } : n
      )
    );

    navigate("/mynotes");
  };

  return (
    <div className="designinput">
      <div className="designnav">
        <Navbar />
      </div>
      <div className="designinputcontent">
        <div
          ref={editRef}
          onChange={() => {
            if (editRef.current.innerText.trim() === "") {
              setIsEmpty(true);
            } else {
              setIsEmpty(false);
            }
          }}
          contentEditable="true"
          style={{
            border: "1px solid gray",
            minHeight: "150px",
            padding: "10px",
            backgroundColor: "#fff",
          }}
        ></div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
