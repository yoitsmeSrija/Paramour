import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';


const cardImages = [
  { "src": process.env.PUBLIC_URL + "/img/c1.jpg", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/c2.jpg", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/c3.jpg", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/c4.jpg", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/c5.jpg", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/c6.jpg", matched: false } 

];

export default function SweetHearts() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const[choiceOne, setChoiceOne]=useState(null);
  const[choiceTwo, setChoiceTwo]=useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src===choiceOne.src){
              return {...card, matched: true};
            }
            else{
              return card;
            }
          })
      })
        resetTurn();
    }   else{
      setTimeout(() =>resetTurn() , 1000);
    }
  }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
  if (cards.length > 0 && cards.every(card => card.matched)) {
    setTimeout(() => {
      alert(`YAYAYAAY! You finished in ${turns} turns! Maybe you can do better? Else, just enjoy the sweet victory and try other games!!!`);
    }, 500);
  }
}, [cards, turns]);
  

   const handleChoice=(card)=>{ 
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
   }
 
   const resetTurn=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
   }

  return (
    <div className="sweethearts-page">
      <h1 className="aesthetic-title">Sweet Hearts Matching</h1>
      <button className="custom-btn" onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card===choiceOne || card===choiceTwo || card.matched}/>
        ))}


      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}