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

  const gotoaddnote=()=>{
    navigate("/addnote");
  }
    const handleUpdate = (note) => {
        
        navigate("/editnote", { state: { note } });
    };

const handleDelete = (id) => {
    setNotes((prevNotes) => {
        return prevNotes.map((note) =>
            note.id === id ? { ...note, isTrash: true } : note
        );
    });
};
    const toggleFavourite = (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, isFavourite: !note.isFavourite } : note
            )
        );
    };

    const realNotes= notes.filter((note) => !note.isTrash)
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
                    {realNotes.length ===0 ? (
                        <h2 
                        style={{textAlign:"center", color:"red" }}
                        >you have no notes !<br/>
                        <span style={{color:"black", cursor:"pointer"}}
                        onClick={gotoaddnote}
                        >Create new notes</span>
                        </h2>
                    ):
                    (
                        realNotes.map((note)=>(
                        <div key={note.id} className="note" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            
                            <p>{note.content}</p>
                                {note.isFavourite ? (
                                    
                                    <StarIcon className="starIcon" onClick={() => toggleFavourite(note.id)} />
                                    
                                ) : (
                                    <StarBorderIcon className="starBorderIcon" onClick={() => toggleFavourite(note.id)} />
                                )}
                                <EditRoundedIcon className="editIcon" onClick={() => handleUpdate(note)} />
                                <AutoDeleteRoundedIcon className="deleteIcon" onClick={() => handleDelete(note.id)} />
                        </div> ) 
                    ))}
                </div>
            </div>
        </div>
    );
}