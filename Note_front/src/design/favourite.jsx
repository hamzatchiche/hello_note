import Navbar from "./navbar";
import './mynotes.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState as usestate } from "react";
import './favourite.css'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
export default function Favourite({notes, setNotes}){
    const [isFavourite, setIsFavourite] = usestate(true);

const navigate = useNavigate();

    const handleUpdate = (note) => {
        navigate(`/editnote/${note.id}`, { state: { note } });
    };

 const handleDelete = async (id) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, is_trash: !note.is_trash } : note
            )
        );
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            await api.post(`/home/istrash/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };
    const toggleFavourite =async (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, is_favorite: !note.is_favorite } : note
            )
        );
        try {
            await api.patch(`/notes/${id}`)
        } catch (error) {
            
        }
    };
const favNotes=notes.filter((note) => ( note.is_favorite && !note.is_trash));
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
                <h1>My Favourite Notes</h1>
                {favNotes.length === 0 ? (
                    <h2
                    style={{textAlign :"center", marginTop:"2rem", color:"goldenrod"}}
                    >no Favourite items !</h2>
                ) :(

                    <div className="mynotescontent" >
                        {
                            favNotes.map((favourite) => (
                            <div key={favourite.id} className="note" style={{display : "flex", alignItems : "center" , gap : "10px"}}>
                    <p>{favourite.note_text}</p>
                    {favourite.is_favorite ? (
                        <StarIcon className="starIcon" onClick={() => toggleFavourite(favourite.id)} />
                    ) : 
                    (
                        <StarBorderIcon className="starBorderIcon" onClick={() => toggleFavourite(favourite.id)} />
                    )
                }
                <EditRoundedIcon className="editIcon" onClick={() => handleUpdate(favourite)} />
                <AutoDeleteRoundedIcon className="deleteIcon" onClick={() => handleDelete(favourite.id)} />
                </div>))
                }
                </div>
            )
                    }
            </div>
        </div>
    )
}
