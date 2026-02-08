import React from 'react'
import sweethearts from '../sweethearts.jpg';
import {useNavigate} from "react-router-dom";
import connection from '../connection.jpg';
import mssg from '../mssg.jpg';


export default function Carousel(props) {
  const navigate=useNavigate();
  const gotoConnect=()=>{
    navigate('/Connect');
  }
  const gotoSH=()=>{
    navigate('/sweetheart');
  }
  return (
    <div>
<div className="carousel-container">
    <h1 className="caro-txt">
        <h2>Hi {props.name}!!</h2> Choose your game:
    </h1>
</div>
    <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
   
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={connection} className="d-block w-100" alt="..." onClick={gotoConnect}/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Connection Quiz</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src={sweethearts} className="d-block w-100" alt="..." onClick={gotoSH}/>
      <div className="carousel-caption d-none d-md-block">
        <h5>SweetHearts</h5>
      </div>
    </div>
    <div className="carousel-item">
            <img src={mssg} className="d-block w-100" alt="Vase Decoration" onClick={() => navigate('/Vase')}/>
            <div className="carousel-caption">
              <h5>Hidden Messages</h5>
            </div>
          </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
