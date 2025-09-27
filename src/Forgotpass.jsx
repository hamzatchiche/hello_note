import './forgotpass.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function Forgotpass() {
    return (
        <div className='forgotpass'>
            <h2>Forgot Password Page</h2>
           
           <div className='fpform'>

            <p>Please enter your email to reset your password</p>
            <TextField
          label="Email"
          id="standard-size-normal"
          variant="standard"
          />
          <Link to="/login">
          <Button variant="outlined">Reset Password</Button>
          </Link>
          </div>
        </div>
    )
}
          