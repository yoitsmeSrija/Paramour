import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
    "What is your partner’s dream vacation?",
    "Does your partner prefer a night in or a night out?",
    "Salty or sweet snacks?",
    "What is your partner’s favorite childhood memory?",
    "What is his/her biggest fear?",
    "Does your partner think that pineapple belongs on pizza?",
    "Is your partner a rule follower or a rebel?",
    "Would your partner say you are tidy or messy?",
    "What is your partner’s favorite movie or TV show?",
    "Would your partner get your name or initals tattooed on him/her?"
];

export default function Connection() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({}); 
    const [inputValue, setInputValue] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    
    const navigate = useNavigate();

    const handleNext = () => {
        setAnswers({ ...answers, [currentQuestion]: inputValue });
        setInputValue(""); 

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setIsFinished(true);
        }
    }; 

    const setRestart = () => {
        setIsFinished(false);
        setCurrentQuestion(0);
        setAnswers({});
        setInputValue("");
    } 

    return (
        <div className="main-box connection-container">
            {isFinished ? (
                <div className="finish-screen">
                    <h1 className="main-title" style={{fontSize: '3rem'}}>Quiz Complete! 💖</h1>
                    <p className="sub-title" style={{fontSize: '1.5rem'}}>
                        Now... go ask your partner these questions and see if your answers match!
                    </p>
                    <button className="custom-btn" onClick={setRestart}>Play Again</button>
                    <br/>
                    <button className="custom-btn" onClick={() => navigate('/Caro')}>
                        Back to Menu
                    </button>
                </div>
            ) : (
                <div className="question-content">
                    <h2 style={{ color: '#8a0b29', marginBottom: '10px' }}>Connection Quiz</h2>
                    

                    <h3 className="question-text">
                        {currentQuestion + 1}. {questions[currentQuestion]}
                    </h3>

                    <textarea 
                        className="quiz-input"
                        placeholder="Type your answer here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        rows="3"
                    />

                    <div className="button-group">
                        <button className="custom-btn" onClick={handleNext}>
                            {currentQuestion === questions.length - 1 ? "Finish" : "Next Question"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
