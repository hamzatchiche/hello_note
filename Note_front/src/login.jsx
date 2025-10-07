import * as React from "react";
import "./login.css";
import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "@mui/material/Input";
import AccountCircle from "@mui/icons-material/AccountCircle";
import api from "./api/axios";
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

const mail=useRef(null)

React.useEffect(()=>{
  mail.current.focus();
}, [])

// login form
const [message, setmessage]=React.useState("")
const [email,setemail]=React.useState("")
const [password,setpassword]=React.useState("")
const navigate=useNavigate()
const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const res= await api.post("/login",{
      email,password
    });
    setmessage("welcome",res.data.data);
    localStorage.setItem("token", res.data.acces_token);
    navigate("/mynotes")
    
  } catch (err) {
    console.error(err)
    setmessage("error loginIn")
  }
}

  return (
    <div className="login">
        <h1>Welcome Back</h1>
      {message && <h2 style={{color:"red"}}>{message}</h2>}
        <form action="post" className="loginContainer" onSubmit={handlesubmit}>

        <FormControl variant="standard">
          <InputLabel ref={mail} htmlFor="input-with-icon-adornment" >email</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={email}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            onChange={e=> setemail(e.target.value)}
          />
        </FormControl>

        <FormControl  variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            value={password}
            onChange={e=> setpassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Link to="/Forgotpass" className="forgpwdlink">Forgot Password?</Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#186d78",
              "&:hover": {
                backgroundColor: "#0d4650ff",
              },
            }}

          >
            Sign in
          </Button>
        </FormControl>
        </form>
        <Link to="/register" >
        <span className="loginText">Don't have an account?</span>
           Sign Up
        </Link>
      </div>
    
  );
}
