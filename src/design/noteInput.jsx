import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import { useNavigate } from "react-router-dom";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import "./index.css";
import Navbar from "./navbar";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));
export default function NoteInput({notes, setNotes}) {
const navigate = useNavigate();
const gotomynotes=()=>{
  navigate("/mynotes");
}

const [formats, setFormats] = React.useState(() => []);
  const [isEmpty, setisempty] = React.useState(true);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handlefocus = () => {
    if (isEmpty && editRef.current) {
      editRef.current.innerHTML = "";
      setisempty(false);
    }
  };

  const handleBlur = () => {
    if (editRef.current && editRef.current.innerText.trim() === "") {
      setisempty(true);
    }
  };
 useEffect(() => {
  if (editRef.current && isEmpty) {
    editRef.current.innerHTML = "<p>Start typing here...</p>";
  }
}, [isEmpty]);

  const editRef = useRef(null);

  const formattext = (command, value = null) => {
    document.execCommand(command, false, null);
  };
    return(
      <div className="designinput">
        <div className="designnav">
          <Navbar />
        </div>
        <div className="designinputcontent">
        <Paper
          elevation={0}
          sx={(theme) => ({
            display: "flex",
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          <StyledToggleButtonGroup
            size="small"
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton
              value="bold"
              aria-label="bold"
              onClick={() => formattext("bold")}
            >
              <FormatBoldIcon />
            </ToggleButton>

            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <ToggleButton
              value="italic"
              aria-label="italic"
              onClick={() => formattext("italic")}
            >
              <FormatItalicIcon />
            </ToggleButton>

            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <ToggleButton
              value="underlined"
              aria-label="underlined"
              onClick={() => formattext("underline")}
            >
              <FormatUnderlinedIcon />
            </ToggleButton>

            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <ToggleButton value="color" aria-label="color">
              <input
                type="color"
                onChange={(e) =>
                  document.execCommand("forecolor", false, e.target.value)
                }
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              />
            </ToggleButton>

            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <ToggleButton
              value="save"
              aria-label="save"
              onClick={() => {
                const content = editRef.current.innerText;
                if(content !=="")
                {

                  setNotes(prev =>[...prev,{
                    id:Date.now(),
                    content: content,
                    isFavourite: false,
                  }])
                  alert("Content saved!");
                  gotomynotes();
                }
                else{
                  alert("Cannot save empty note.");
                }
              }}
            >
              <SaveIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
        
        <div
          ref={editRef}
          contentEditable="true"
          style={{
            border: "1px solid gray",
            minHeight: "150px",
            padding: "10px",
            backgroundColor: "#fff",
          }}
          onFocus={handlefocus}
          onBlur={handleBlur}
        ></div>
      </div>
      </div>
    )
}