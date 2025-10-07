import Navbar from "./navbar";
import './mynotes.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoDeleteRoundedIcon from '@mui/icons-material/AutoDeleteRounded';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useEffect } from "react";

export default function MyNotes({ notes, setNotes }) {
    const [isFavourite, setIsFavourite] = useState();
    const navigate = useNavigate();

    // Vérification du token dès le montage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found, redirecting to login");
            navigate("/login");
        }
    }, [navigate]);

    const gotoaddnote = () => {
        navigate("/addnote");
    }

    const handleUpdate = (note) => {
        navigate(`/editnote/${note.id}`, { state: { note } });
    };

    const handleDelete = async (id) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, isTrash: true } : note
            )
        );
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            await api.patch(`/home/istrash/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const toggleFavourite = async (id) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, isFavourite: !note.isFavourite } : note
            )
        );
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            await api.post(`/home/isfavorite/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
    };

    const realNotes = notes.filter(note => !note.isTrash);

    return (
        <div className="mynotes" style={{ display: "flex" }}>
            <div className="designnav">
                <Navbar />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h1>My Notes</h1>
                <div className="mynotescontent">
                    {realNotes.length === 0 ? (
                        <h2 style={{ textAlign: "center", color: "red" }}>
                            you have no notes !<br />
                            <span style={{ color: "black", cursor: "pointer" }} onClick={gotoaddnote}>
                                Create new notes
                            </span>
                        </h2>
                    ) : (
                        realNotes.map(note => (
                            <div key={note.id} className="note" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <p>{note.note_text}</p>
                                {note.is_favorite ? (
                                    <StarIcon className="starIcon" onClick={() => toggleFavourite(note.id)} />
                                ) : (
                                    <StarBorderIcon className="starBorderIcon" onClick={() => toggleFavourite(note.id)} />
                                )}
                                <EditRoundedIcon className="editIcon" onClick={() => handleUpdate(note)} />
                                <AutoDeleteRoundedIcon className="deleteIcon" onClick={() => handleDelete(note.id)} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
