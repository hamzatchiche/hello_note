import './signup.css';
import * as React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from './assets/logo.png'

import api from './api/axios';
export default function Signup() {
    
  const [fullname,setfullname]=React.useState("");
  const [email, setemail]=React.useState("");
  const [pass,setpass]=React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setmessage]=React.useState("")
const handlesubmit = async (e)=>{
  e.preventDefault()
  try {
    const res= await api.post("/auth/register" ,{
      fullname,email,pass
    });
    setmessage(res.data.message)
    console.log("Signup successful:", res.data);
    
  } catch (error) {
    console.log("error", error)
  }
}

      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleMouseUpPassword = (event) => {
        event.preventDefault();
      };

      const fname=React.useRef(null);
React.useEffect(()=>{
  fname.current.focus();
}, [])

  return (
    <div className="signup">
      {message && <h2 style={{color:"green"}}>{message}</h2>}
      <form onSubmit={handlesubmit} className="signupform">
        <img src={Logo} alt="" className='logo'/>
      <h1>Create Account</h1>
        <TextField
          inputRef={fname}
          id="outlined-full-name-input"
          label="full name"
          type="text"
          background-color="white"
          value={fullname}
          onChange={ 
            e=> setfullname(e.target.value)
          }
        />
        
        <TextField
          id="outlined-email-input"
          label="email"
          type="text"
            autoComplete="current-email"
            value={email}
            onChange={e => setemail(e.target.value)}
        />
        <FormControl className='passwordField' variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          value={pass}
          onChange={e=>{
            setpass(e.target.value)
          }}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment >
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
        <TextField
          id="outlined-password-input"
          label="Confirm Password"    
          type="password"
          autoComplete="current-password"
        />
<Button variant="contained" type='submite'>Signup</Button>
      </form>
      <Link to="/login"><span className='loginText'>Already have an account?</span> Login</Link>
    </div>
  );
}

