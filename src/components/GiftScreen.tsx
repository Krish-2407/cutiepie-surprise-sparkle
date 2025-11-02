import { useState } from "react";
import giftBox from "@/assets/gift-box.png";

export const GiftScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string; color: string }>>([]);

  const handleOpen = () => {
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.5}s`,
      color: ['#a855f7', '#ec4899', '#06b6d4', '#fbbf24', '#10b981'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 relative overflow-hidden">
      {/* Sparkle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-4 h-4 animate-confetti"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            backgroundColor: piece.color,
            top: '-10px'
          }}
        />
      ))}
      
      {!isOpen ? (
        <>
          <h2 className="text-3xl md:text-4xl font-hand neon-text text-center animate-slide-up">
            One Last Thing...
          </h2>
          
          <button
            onClick={handleOpen}
            className="relative group cursor-pointer focus:outline-none transition-smooth hover:scale-110 animate-bounce-in"
          >
            <img
              src={giftBox}
              alt="Gift box"
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_40px_rgba(239,68,68,0.6)] animate-gift-bounce"
            />
          </button>
          
          <p className="text-2xl md:text-3xl font-hand neon-pink-text animate-shimmer">
            Tap the gift
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-4 justify-center animate-bounce-in">
            <span className="text-7xl animate-float" style={{ animationDelay: '0s' }}>💖</span>
            <span className="text-7xl animate-float" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="text-7xl animate-float" style={{ animationDelay: '0.4s' }}>💖</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-hand neon-pink-text font-bold text-center leading-tight animate-scale-in">
            I Love You
          </h1>
          
          <div className="flex gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <span className="text-7xl animate-float" style={{ animationDelay: '0.6s' }}>💝</span>
            <span className="text-7xl animate-float" style={{ animationDelay: '0.8s' }}>🎈</span>
            <span className="text-7xl animate-float" style={{ animationDelay: '1s' }}>💝</span>
          </div>
        </div>
      )}
    </div>
  );
};
