import Navbar from "./navbar";
import './mynotes.css'
import { useState as usestate } from "react";
import './favourite.css'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import api from "../api/axios";    
export default function Favourite({notes, setNotes}){

const handleRestore =async (id) => {
    setNotes((prevNotes) => {
        return prevNotes.map((note) =>
            note.id === id ? { ...note, isTrash: false } : note
        );
    });
    try {
        await api.patch(`/notes/trash/${id}`, {isTrash : false})
    } catch (error) {
        
    }
};


const handleDelete = async (id) => {
  try {
    await api.delete(`/notes/delete/${id}`);
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

const trashNotes= notes.filter((note)=> note.isTrash);
    

    return (
        <div className="mynotes" style={{ minHeight: "100vh", display: "flex" }}>
            <Navbar />
            <div
                
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1>My Trash Notes</h1>
                {trashNotes.length === 0 ? ( <h2 
                style={{textAlign: "center", marginTop : "2rem", color:"red"}}
                >trash is empty !</h2> ):
                (<div className="mynotescontent" >
                    {trashNotes.map((trash) => (
                        <div key={trash.id} className="note" style={{display : "flex", alignItems : "center" , gap : "10px"}}>
                            <p>{trash.content}</p>
                            <RestoreRoundedIcon className="starIcon" onClick={() => handleRestore(trash.id)} />
                            <DeleteRoundedIcon className="deleteIcon" onClick={() => handleDelete(trash.id)} />
                        </div>
                    ))}
                    </div>
                )  
                    }
            </div>
        </div>
    );
}
