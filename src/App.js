import './App.css';
import React, {useState} from 'react';
import Welcome from './components/Welcome';
import Carousel from './components/Carousel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import Connection from './components/Connection';
import SweetHearts from './components/SweetHearts';
import Messages from './components/Messages';

export default function App() {

  const[name, setName]=useState("");

  return (
   <Router>
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Main" element={<Main setName={setName}/>} />
        <Route path="/Caro" element={<Carousel name={name}/>} />
        <Route path="/SweetHeart" element={<SweetHearts/>} />
        <Route path="/Connect" element={<Connection/>} />
        <Route path="/Vase" element={<Messages/>} />
      </Routes>
    </div>
    </Router>
  );
}