import React from 'react';
import {useNavigate} from "react-router-dom";

export default function Main(props) {
    const navigate=useNavigate();
    const gotoCarousel=()=>{
        const val = document.getElementById("name-id").value;
        props.setName(val);
      navigate('/Caro')
    }
  return (
    <div>
      <h1>Enter your name here:</h1>
      <input type="text" placeholder="Your Name" id="name-id" />
      <br/>
      <br/>
      <button type="button" className="custom-btn" onClick={gotoCarousel}>Next</button>
    </div>
  )
}
