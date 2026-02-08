import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const messageBank = [
  "You're my favorite! ❤️",
  "Let's get Boba? 🧋",
  "Cutieee ✨",
  "My Paramour 🍒",
  "Thinking of you :)... 💭",
  "Best Gamerrr ever 💻",
  "How are you so amazing? 😍",
  "You make my heart bloom 🌸"
];

export default function Messages() {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [randomSecrets, setRandomSecrets] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState(new Set());

  useEffect(() => {
    // Randomize locations with better spacing
    const shuffled = messageBank.map((text, index) => ({
      id: index,
      text,
      top: Math.floor(Math.random() * 60) + 20, 
      left: Math.floor(Math.random() * 70) + 15 
    }));
    setRandomSecrets(shuffled);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create a soft gradient for the garden floor
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#fff5f7');
    gradient.addColorStop(1, '#ffd1dc');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw more diverse, overlapping flowers
    const flowers = ['🌸', '🌹', '🌷', '🌺', '🌼', '🌿', '🍃'];
    for(let i = 0; i < 250; i++) {
        const f = flowers[Math.floor(Math.random() * flowers.length)];
        ctx.font = `${Math.random() * 20 + 30}px serif`;
        ctx.save();
        ctx.translate(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.rotate(Math.random() * Math.PI); // Random rotation for natural look
        ctx.fillText(f, 0, 0);
        ctx.restore();
    }

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const scrub = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    // Softer brush edges
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2); 
    ctx.fill();

    randomSecrets.forEach((s, index) => {
      if (!revealedIndices.has(index)) {
        const sX = (s.left / 100) * canvas.width;
        const sY = (s.top / 100) * canvas.height;
        
        const dist = Math.sqrt((x - sX)**2 + (y - sY)**2);
        if (dist < 40) { 
          setRevealedIndices(prev => {
            const newSet = new Set(prev).add(index);
            setFoundCount(newSet.size);
            return newSet;
          });
        }
      }
    });
  };

  return (
    <div className="full-screen-garden">
      <div className="game-header-glass">
        <p className="instructions-text">Brush the screen to find the hidden messages</p>
        <div className="counter-pill">
          {foundCount} / {messageBank.length} Found
        </div>
      </div>

      <div className="secret-layer">
        {randomSecrets.map((s, i) => (
          <div 
            key={i} 
            className={`hidden-note ${revealedIndices.has(i) ? 'pop-in' : ''}`} 
            style={{ 
                top: `${s.top}%`, 
                left: `${s.left}%`,
                opacity: revealedIndices.has(i) ? 1 : 0 
            }}
          >
            {s.text}
          </div>
        ))}
      </div>

      <canvas 
        ref={canvasRef}
        onMouseDown={() => isDrawing.current = true}
        onMouseUp={() => isDrawing.current = false}
        onMouseMove={scrub}
        onTouchStart={() => isDrawing.current = true}
        onTouchEnd={() => isDrawing.current = false}
        onTouchMove={scrub}
        className="scratch-canvas"
      />

      <button 
  className="reset-garden-btn" 
  onClick={() => window.location.reload()}
>
  Reset Garden 🌸
</button>
    </div>
  );
}