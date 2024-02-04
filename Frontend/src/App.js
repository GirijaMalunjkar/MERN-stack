import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Pages/Home";
import Registration from "./components/authentication/Registration"
import Login from "./components/authentication/Login";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";

function App() {
  return (
    <>
    <Navbar/>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
   
    <Footer/>
    </>
  );
}

export default App;
