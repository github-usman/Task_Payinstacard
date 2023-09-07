import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import UserDetails from "./components/UserDetails";
import Footer from "./components/Footer";

function App() {




  return (
    <NoteState>
      
    <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route exact path="/" element={<UserDetails />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/userdetails" element={<UserDetails />} />
      </Routes>
    </div>
    <Footer/>
  </BrowserRouter>

  </NoteState>
  );
}

export default App;
