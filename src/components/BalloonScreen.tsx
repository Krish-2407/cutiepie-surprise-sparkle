import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BalloonScreenProps {
  onNext: () => void;
}

const balloons = [
  { id: 1, color: "#fbbf24", word: "You", left: "15%", animationDelay: "0s" },
  { id: 2, color: "#10b981", word: "are", left: "35%", animationDelay: "0.2s" },
  { id: 3, color: "#3b82f6", word: "a", left: "55%", animationDelay: "0.4s" },
  { id: 4, color: "#ec4899", word: "Cutieee", left: "75%", animationDelay: "0.6s" },
];

export const BalloonScreen = ({ onNext }: BalloonScreenProps) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);

  const handlePop = (id: number) => {
    if (!poppedBalloons.includes(id)) {
      setPoppedBalloons([...poppedBalloons, id]);
    }
  };

  const allPopped = poppedBalloons.length === balloons.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-hand neon-text text-center">
        Pop all 4 balloons
      </h2>
      
      <div className="relative w-full max-w-4xl h-96">
        {balloons.map((balloon) => {
          const isPopped = poppedBalloons.includes(balloon.id);
          return (
            <div
              key={balloon.id}
              className="absolute bottom-0"
              style={{ left: balloon.left, transform: 'translateX(-50%)' }}
            >
              {!isPopped ? (
                <button
                  onClick={() => handlePop(balloon.id)}
                  className="cursor-pointer transition-transform hover:scale-110 animate-float focus:outline-none"
                  style={{ animationDelay: balloon.animationDelay }}
                >
                  <div className="relative">
                    <div
                      className="w-24 h-32 md:w-32 md:h-40 rounded-full shadow-lg"
                      style={{
                        backgroundColor: balloon.color,
                        boxShadow: `0 0 30px ${balloon.color}80`
                      }}
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-muted-foreground/30" />
                  </div>
                </button>
              ) : (
                <div className="text-4xl md:text-5xl font-hand neon-pink-text font-bold animate-scale-in text-center">
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
