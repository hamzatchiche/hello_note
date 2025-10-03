import Navbar from "./navbar";
import './mynotes.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState as usestate } from "react";
import './favourite.css'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import { useNavigate } from "react-router-dom";
export default function Favourite({notes, setNotes}){
    const [isFavourite, setIsFavourite] = usestate(true);

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
                {notes.filter((note) => ( note.isFavourite)).map((favourite) => (
                <div className="mynotescontent" >
                    <div key={favourite.id} className="note" style={{display : "flex", alignItems : "center" , gap : "10px"}}>
                        <p>{favourite.content}</p>
                        {favourite.isFavourite ? (
                            <StarIcon className="starIcon" onClick={() => toggleFavourite(favourite.id)} />
                        ) : 
                        (
                            <StarBorderIcon className="starBorderIcon" onClick={() => toggleFavourite(favourite.id)} />
                        )
                        }
                        <EditRoundedIcon className="editIcon" onClick={() => handleUpdate(favourite)} />
                        <AutoDeleteRoundedIcon className="deleteIcon" onClick={() => handleDelete(favourite.id)} />
                    </div>
                </div>
                    ))}
            </div>
        </div>
    )
}
