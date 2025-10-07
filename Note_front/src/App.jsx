import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Forgotpass from "./Forgotpass";
import Signup from "./signup";
import Design from "./design";
import MyNotes from "./design/mynotes";
import Favourite from "./design/favourite";
import NoteInput from "./design/noteInput";
import Trash from "./design/trash";
import EditNote from "./design/editnote";
import Error from "./error";
import "./App.css";
import api from "./api/axios";

export default function App() {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const fetchnotes = async () => {
      try {
        
        const token = localStorage.getItem("token");
        const res = await api.post(
          "/home",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes(res.data.notes || res.data); // selon ta réponse backend
      } catch (error) {
        console.error("❌ Error fetching notes:", error);
      }
    };
    fetchnotes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Forgotpass" element={<Forgotpass />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/design" element={<Design />} />
        <Route path="/mynotes" element={<MyNotes notes={notes} setNotes={setNotes} />} />
        <Route path="/favourite" element={<Favourite notes={notes} setNotes={setNotes} />} />
        <Route path="/addnote" element={<NoteInput notes={notes} setNotes={setNotes} />} />
        <Route path="/editnote/:id" element={<EditNote notes={notes} setNotes={setNotes} />} />
        <Route path="/trash" element={<Trash notes={notes} setNotes={setNotes} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}
