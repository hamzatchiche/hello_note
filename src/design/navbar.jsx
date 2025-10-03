import { href, Link, Navigate } from "react-router-dom";
import "./navbar.css";
import Button from "@mui/material/Button";
// icons
import AddIcon from "@mui/icons-material/Add";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar({onaddnote}) {
  const [showinput, setshowinput] = useState(false);
  const navigate = useNavigate();
  const gotoaddnote=()=>{
    navigate("/addnote");
  }

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  return (
    <>
      <div className="sidenavbar" onMouseEnter={handleMouseEnter} onMouseLeave={() => setHovered(false)}>
        <div className="navlinks">
          <Link to="/mynotes" className="navlink">
            <FormatListBulletedRoundedIcon />
            <span>All notes</span>
          </Link>
          <Link to="/favourite" className="navlink">
            <FavoriteRoundedIcon />
            <span>Favourite</span>
          </Link>
          <Link to="/trash" className="navlink">
          <DeleteRoundedIcon />
           <span>Trash</span>
          </Link>
        </div>
        <div className="addnote">
  {!hovered ? (
    <Button
      variant="outlined"
      onClick={gotoaddnote}
      style={{
        borderRadius: "50%",
        minWidth: "3rem",
        width: "3rem",
        height: "3rem",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <AddIcon />
    </Button>
  ) : (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      onClick={gotoaddnote}
      style={{ width: "90%", margin: "1rem auto", borderRadius: "1rem" }}
    >
      <span>Add Note</span>
    </Button>
  )}
</div>

      </div>
    </>
  );
}
