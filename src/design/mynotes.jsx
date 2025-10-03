import Navbar from "./navbar";
import './mynotes.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import { useState as usestate } from "react";
import { useNavigate } from "react-router-dom";
export default function MyNotes({ notes, setNotes }) {
    const [isFavourite, setIsFavourite] = usestate();
    
    const navigate = useNavigate();

    const handleUpdate = (note) => {
        
        navigate("/editnote", { state: { note } });
    };

const handleDelete=(id)=>{
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
}
    const toggleFavourite = (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, isFavourite: !note.isFavourite } : note
            )
        );
    };
    return (
        <div className="mynotes" style={{  display: "flex" }}>
            <div className="designnav">
<Navbar />
            </div>
            
            <div
                
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1>My Notes</h1>
                <div className="mynotescontent">
                    {notes.map((note) => (
                        <div key={note.id} className="note" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <p>{note.content}</p>
                                {note.isFavourite ? (
                                    <StarIcon className="starIcon" onClick={() => toggleFavourite(note.id)} />
                                    
                                ) : (
                                    <StarBorderIcon className="starBorderIcon" onClick={() => toggleFavourite(note.id)} />
                                )}
                                <EditRoundedIcon className="editIcon" onClick={() => handleUpdate(note)} />
                                <AutoDeleteRoundedIcon className="deleteIcon" onClick={() => handleDelete(note.id)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}