import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Forgotpass from './Forgotpass';
import Signup from './signup';
import Design from './design';
import './App.css'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Forgotpass" element={<Forgotpass />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </Router>
  );
}
