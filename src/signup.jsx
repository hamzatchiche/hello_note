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
export default function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    
      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleMouseUpPassword = (event) => {
        event.preventDefault();
      };
  return (
    <div className="signup">
      <form action="" className="signupform">
        <img src={Logo} alt="" className='logo'/>
      <h1>Create Account</h1>
        <TextField
          id="outlined-full-name-input"
          label="full name"
          type="text"
          background-color="white"
        />
        
        <TextField
          id="outlined-email-input"
          label="email"
          type="text"
            autoComplete="current-email"
        />
        <FormControl className='passwordField' variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
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
<Button variant="contained">Signup</Button>
      </form>
      <Link to="/login"><span className='loginText'>Already have an account?</span> Login</Link>
    </div>
  );
}

