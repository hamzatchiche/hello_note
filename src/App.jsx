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
import "./App.css";
export default function App() {
  // const [showinput, setshowinput] = React.useState(false);
  const [notes, setNotes] = React.useState([
    {
      id: 1,
      content: "This is my first note.",
      isFavourite: false,
    },
    {
      id: 2,
      content: "This is my second note.",
      isFavourite: false,
    },
    {
      id: 3,
      content:
        "This is my third note. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, iste? Repellendus quos ducimus laboriosam iste iure facilis molestiae unde animi praesentium quia natus, dolores nihil, id tempore nulla repellat obcaecati! Eius dolor architecto magni tempora numquam officia autem perspiciatis nemo minus? Molestias velit nihil non hic sit, voluptatibus beatae. Iusto quaerat pariatur possimus explicabo! Officia dolorum soluta quia ut numquam. Molestias asperiores enim accusamus cumque velit perspiciatis maiores quas ad eum repellat, pariatur, harum exercitationem dolorem, libero rerum laboriosam eaque vitae vel! Possimus et necessitatibus quidem quasi aperiam dolores dolorum reprehenderit. Facere voluptate, asperiores ad nam ipsam reprehenderit, eius suscipit consequatur eum veritatis ea! Repellendus voluptas explicabo pariatur mollitia corporis ducimus suscipit?",
      isFavourite: true,
    },
  ]);
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
        <Route path="/editnote" element={<EditNote notes={notes} setNotes={setNotes} />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Router>
  );
}
