import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate=useNavigate();

  const gotoMain=()=>{
    navigate('/Main');
  }
  return (
    <div className="welcome-box">
        <h1 className="main-title">Welcome to Paramour</h1>
        <h2 className="sub-title">Hehehe.. Hope You Enjoyy!!</h2>
        <button type="button" className="custom-btn" onClick={gotoMain}>Start!!</button>
    </div>
  )
}
