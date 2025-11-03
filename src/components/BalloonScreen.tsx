import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface BalloonScreenProps {
  onNext: () => void;
}

const balloons = [
  { id: 1, color: "#fbbf24", word: "Happy", left: "20%", animationDelay: "0s" },
  { id: 2, color: "#10b981", word: "Birth", left: "40%", animationDelay: "0.2s" },
  { id: 3, color: "#3b82f6", word: "Day", left: "60%", animationDelay: "0.4s" },
  { id: 4, color: "#ec4899", word: "Cutieee", left: "80%", animationDelay: "0.6s" },
];

// Confetti pieces for party popper effect
const generateConfetti = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    color: ['#fbbf24', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)],
    rotation: Math.random() * 360,
  }));
};

export const BalloonScreen = ({ onNext }: BalloonScreenProps) => {
  const [poppingBalloons, setPoppingBalloons] = useState<number[]>([]);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces] = useState(generateConfetti());

  const POP_ANIMATION_DURATION_MS = 300;

  const handlePop = (id: number) => {
    if (!poppedBalloons.includes(id) && !poppingBalloons.includes(id)) {
      setPoppingBalloons((prev) => [...prev, id]);

      setTimeout(() => {
        setPoppedBalloons((prev) => {
          const newPopped = [...prev, id];
          // Trigger confetti when all 4 balloons are popped
          if (newPopped.length === balloons.length) {
            setShowConfetti(true);
          }
          return newPopped;
        });
        setPoppingBalloons((prev) => prev.filter(bId => bId !== id)); 
      }, POP_ANIMATION_DURATION_MS); 
    }
  };

  const allPopped = poppedBalloons.length === balloons.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 py-8 relative overflow-hidden">
      {/* Party popper confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute bottom-0 animate-confetti-burst"
              style={{
                left: piece.left,
                animationDelay: piece.delay,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotation}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <h2 className="text-6xl md:text-7xl font-stylish neon-text text-center tracking-wide">
        Pop all 4 balloons
      </h2>
      
      <div className="relative w-full max-w-3xl h-96">
        {balloons.map((balloon) => {
          const isPopped = poppedBalloons.includes(balloon.id);
          const isPopping = poppingBalloons.includes(balloon.id);
          
          return (
            <div
              key={balloon.id}
              className="absolute bottom-0"
              style={{ left: balloon.left, transform: 'translateX(-50%)' }}
            >
              {!isPopped ? (
                <button
                  onClick={() => handlePop(balloon.id)}
                  className={`cursor-pointer transition-transform hover:scale-110 animate-float focus:outline-none ${isPopping ? 'balloon-pop' : ''}`}
                  style={{ 
                    animationDelay: balloon.animationDelay, 
                    pointerEvents: isPopping ? 'none' : 'auto' 
                  }}
                >
                  <div className="relative">
                    {/* Classic balloon shape */}
                    <div
                      className="relative w-28 h-36 md:w-32 md:h-44"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${balloon.color}ff, ${balloon.color}dd 40%, ${balloon.color}99 70%, ${balloon.color}66)`,
                        borderRadius: '50% 50% 47% 53% / 55% 55% 50% 50%',
                        boxShadow: `0 8px 30px ${balloon.color}60, inset -15px -20px 30px rgba(0,0,0,0.25), inset 15px 15px 30px rgba(255,255,255,0.4)`,
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                      }}
                    >
                      {/* Main highlight */}
                      <div 
                        className="absolute top-5 left-5 w-10 h-14 rounded-full opacity-60"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
                          transform: 'rotate(-15deg)'
                        }}
                      />
                      {/* Secondary highlight */}
                      <div 
                        className="absolute top-12 right-6 w-4 h-6 rounded-full opacity-30"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, transparent 70%)'
                        }}
                      />
                    </div>
                    {/* Balloon knot/tie */}
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-4"
                      style={{
                        background: `linear-gradient(180deg, ${balloon.color}dd, ${balloon.color}99)`,
                        clipPath: 'polygon(50% 0%, 20% 40%, 35% 100%, 65% 100%, 80% 40%)',
                        filter: 'brightness(0.7)'
                      }}
                    />
                    {/* Curvy string */}
                    <svg 
                      className="absolute top-full left-1/2 transform -translate-x-1/2" 
                      width="4" 
                      height="120" 
                      style={{ marginTop: '4px' }}
                    >
                      <path 
                        d="M 2 0 Q 10 30, 2 60 Q -6 90, 2 120" 
                        stroke="rgba(139, 92, 246, 0.4)" 
                        strokeWidth="1.5" 
                        fill="none"
                      />
                    </svg>
                  </div>
                </button>
              ) : (
                <div className="text-5xl md:text-6xl font-stylish neon-pink-text font-bold animate-scale-in text-center">
                  {balloon.word}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {allPopped && (
        <Button
          onClick={onNext}
          size="lg"
          className="text-2xl px-12 py-8 font-stylish neon-border bg-primary/20 hover:bg-primary/40 text-foreground transition-all hover:scale-110 animate-fade-in"
        >
          Next →
        </Button>
      )}
    </div>
  );
};