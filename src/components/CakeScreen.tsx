import { useState } from "react";
import { Button } from "@/components/ui/button";
import cakeImage from "@/assets/birthday-cake.png";

interface CakeScreenProps {
  onNext: () => void;
}

export const CakeScreen = ({ onNext }: CakeScreenProps) => {
  const [step, setStep] = useState<"decorate" | "light" | "complete">("decorate");
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string; color: string }>>([]);
  const [candleLit, setCandleLit] = useState(false);

  const handleDecorate = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.5}s`,
      color: ['#a855f7', '#ec4899', '#06b6d4', '#fbbf24'][Math.floor(Math.random() * 4)]
    }));
    setConfetti(newConfetti);
    
    setTimeout(() => {
      setConfetti([]);
      setStep("light");
    }, 3000);
  };

  const handleLight = () => {
    setCandleLit(true);
    setTimeout(() => {
      setStep("complete");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 relative overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            backgroundColor: piece.color,
            top: '-10px'
          }}
        />
      ))}
      
      <div className="relative">
        <img 
          src={cakeImage} 
          alt="Birthday cake" 
          className={`w-80 h-80 md:w-96 md:h-96 object-contain transition-all duration-500 ${
            candleLit ? 'drop-shadow-[0_0_50px_rgba(251,191,36,0.8)]' : 'drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]'
          }`}
        />
        {candleLit && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-yellow-400 via-orange-500 to-red-500 rounded-full blur-sm animate-pulse" />
        )}
      </div>
      
      {step === "complete" && (
        <h2 className="text-5xl md:text-7xl font-hand neon-text font-bold text-center animate-fade-in">
          Happy Birthday, Cutiepie!
        </h2>
      )}
      
      {step === "decorate" && (
        <Button
          onClick={handleDecorate}
          size="lg"
          className="text-2xl px-12 py-8 font-hand neon-border bg-primary/20 hover:bg-primary/40 text-foreground transition-all hover:scale-110"
        >
          ✨ Decorate
        </Button>
      )}
      
      {step === "light" && (
        <Button
          onClick={handleLight}
          size="lg"
          className="text-2xl px-12 py-8 font-hand neon-pink-border bg-neon-pink/20 hover:bg-neon-pink/40 text-foreground transition-all hover:scale-110"
        >
          🕯️ Light the Candle
        </Button>
      )}
      
      {step === "complete" && (
        <Button
          onClick={onNext}
          size="lg"
          className="text-2xl px-12 py-8 font-hand neon-cyan-text border-2 border-neon-cyan bg-neon-cyan/20 hover:bg-neon-cyan/40 transition-all hover:scale-110"
        >
          Pop the Balloons →
        </Button>
      )}
    </div>
  );
};
