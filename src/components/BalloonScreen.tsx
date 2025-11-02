import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BalloonScreenProps {
  onNext: () => void;
}

const balloons = [
  // ADJUSTED: Changed left percentage to bring them closer to the center (20% gap)
  { id: 1, color: "#fbbf24", word: "Happy", left: "10%", animationDelay: "0s" },
  { id: 2, color: "#10b981", word: "Birth", left: "40%", animationDelay: "0.2s" },
  { id: 3, color: "#3b82f6", word: "Day", left: "66%", animationDelay: "0.4s" },
  { id: 4, color: "#ec4899", word: "Cutieee", left: "90%", animationDelay: "0.6s" },
];

export const BalloonScreen = ({ onNext }: BalloonScreenProps) => {
  // NEW STATE: Tracks balloons that are currently "popping" (for the animation)
  const [poppingBalloons, setPoppingBalloons] = useState<number[]>([]);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);

  const POP_ANIMATION_DURATION_MS = 200; // Matches the CSS animation duration

  const handlePop = (id: number) => {
    if (!poppedBalloons.includes(id) && !poppingBalloons.includes(id)) {
      // 1. Start the popping animation immediately
      setPoppingBalloons((prev) => [...prev, id]);

      // 2. After the animation duration, mark it as fully "popped" to show the word
      setTimeout(() => {
        setPoppedBalloons((prev) => [...prev, id]);
        // Clean up the popping state after the word appears
        setPoppingBalloons((prev) => prev.filter(bId => bId !== id)); 
      }, POP_ANIMATION_DURATION_MS); 
    }
  };

  const allPopped = poppedBalloons.length === balloons.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 py-8">
      {/* CHANGE 3: Increased the size of the title text to 5xl/6xl */}
      <h2 className="text-9xl md:text-9xl font-hand neon-text text-center">
        Pop all 4 balloons
      </h2>
      
      {/* CHANGE 2: Reduced max-w-4xl to max-w-2xl to pull content closer to the center */}
      <div className="relative w-full max-w-2xl h-96"> 
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
                  // CHANGE 1: Added conditional 'pop-animation' class
                  className={`cursor-pointer transition-transform hover:scale-110 animate-float focus:outline-none ${isPopping ? 'pop-animation' : ''}`}
                  style={{ 
                    animationDelay: balloon.animationDelay, 
                    // Prevent clicking while animation is running
                    pointerEvents: isPopping ? 'none' : 'auto' 
                  }}
                >
                  <div className="relative">
                    <div
                      // CHANGE 2: Increased balloon size from w-24/h-32 to w-32/h-40
                      className="w-32 h-40 md:w-36 md:h-48 rounded-full shadow-lg" 
                      style={{
                        backgroundColor: balloon.color,
                        boxShadow: `0 0 30px ${balloon.color}80`
                      }}
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-muted-foreground/30" />
                  </div>
                </button>
              ) : (
                // CHANGE 2: Increased the size of the revealed word text to 5xl/6xl
                <div className="text-5xl md:text-5xl font-hand neon-pink-text font-bold animate-scale-in text-center">
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
          className="text-2xl px-12 py-8 font-hand neon-border bg-primary/20 hover:bg-primary/40 text-foreground transition-all hover:scale-110 animate-fade-in"
        >
          Next →
        </Button>
      )}
    </div>
  );
};