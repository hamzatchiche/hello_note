import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "./navbar";
import api from "../api/axios";
export default async function EditNote({ notes, setNotes }) {
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

  const handleSave =async (e) => {
    e.preventDefault();
    if (!editRef.current) return;
    const updatedContent = editRef.current.innerText;
if (updatedContent === "") {
      setIsEmpty(true);
      return;
    }
    
    try {
      await api.patch(`/notes/edit/${note.id}`,{content : updatedContent});
      
      setNotes(prev=>
        prev.map(n=>n.id === note.id ? {...n,content: updatedContent}: n)
      );
      navigate("/mynotes");
    } catch (error) {
      console.error("failed to update note", error)
    }
  };
    

  return (
    <div className="designinput">
      <div className="designnav">
        <Navbar />
      </div>
      <div className="designinputcontent">
        <div
          ref={editRef}
          onInput={() => {
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
