import './style.css'
import logoicon from './assets/logo.png'
import img2 from './assets/img1.jpg'
import LoginIcon from '@mui/icons-material/Login';
import {Link} from 'react-router-dom';
export default function Home() {
    return (
        <div className="home">
            <div className="navbar">
                
                <ul>
                    <li>
                        <img src={logoicon} alt="" />
                    </li>
                </ul>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/features">Features</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <ul className="list3">
                    <li>
                        <LoginIcon id="im3"/>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                
            </div>

                <div className="content">
                    <div id="s1" >
                        Your Thoughts,
                        Beautifully 
                        Organized.
                    </div>
                    <div id="s2" >
                        Streamline your ideas, notes, and tasks with hello note.
                        Experience simplicity and elegance in a powerful,
                        intuitive application designed to boost your productivity.
                    </div>
                    <button className="start-button">Start Organizing Now</button>
                    <img id="im2" src={img2} alt="" />
                </div>
            </div>
        
    )
}
