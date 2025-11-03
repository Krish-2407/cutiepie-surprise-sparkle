import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BuntingDecoration } from "@/components/BuntingDecoration";

interface CakeScreenProps {
  onNext: () => void;
}

export const CakeScreen = ({ onNext }: CakeScreenProps) => {
  const [step, setStep] = useState<"decorate" | "light" | "complete">("decorate");
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string; color: string; type: 'circle' | 'square' | 'star' }>>([]);
  const [candleLit, setCandleLit] = useState(false);

  const handleDecorate = () => {
    const types: Array<'circle' | 'square' | 'star'> = ['circle', 'square', 'star'];
    const brightColors = ['#ea00ff', '#00ffff', '#ffff00', '#ff00ff', '#00ff00', '#ff0099', '#00ffaa', '#ff6600'];
    
    const newConfetti = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.8}s`,
      color: brightColors[Math.floor(Math.random() * brightColors.length)],
      type: types[Math.floor(Math.random() * types.length)]
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

  const getConfettiShape = (type: 'circle' | 'square' | 'star') => {
    if (type === 'circle') return 'rounded-full';
    if (type === 'square') return 'rotate-45';
    return ''; // star will use clip-path
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 relative overflow-hidden">
      <BuntingDecoration />
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute animate-confetti ${getConfettiShape(piece.type)}`}
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            backgroundColor: piece.color,
            width: piece.type === 'star' ? '12px' : '10px',
            height: piece.type === 'star' ? '12px' : '10px',
            top: '-10px',
            clipPath: piece.type === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined,
            boxShadow: `0 0 10px ${piece.color}, 0 0 20px ${piece.color}`
          }}
        />
      ))}
      
      {/* CSS Cake */}
      <div className="relative">
        {/* Cake Base - Bottom Layer */}
        <div className="relative w-64 h-32 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-[50%] rounded-b-lg shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-[50%]"></div>
          {/* Frosting drips */}
          <div className="absolute top-0 left-8 w-8 h-6 bg-pink-200 rounded-b-full"></div>
          <div className="absolute top-0 left-20 w-6 h-8 bg-pink-200 rounded-b-full"></div>
          <div className="absolute top-0 right-20 w-7 h-7 bg-pink-200 rounded-b-full"></div>
          <div className="absolute top-0 right-8 w-8 h-6 bg-pink-200 rounded-b-full"></div>
        </div>
        
        {/* Cake Middle Layer */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-56 h-28 bg-gradient-to-b from-purple-300 to-purple-400 rounded-t-[50%] rounded-b-lg shadow-xl">
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-purple-200 to-purple-300 rounded-t-[50%]"></div>
          {/* Frosting drips */}
          <div className="absolute top-0 left-6 w-7 h-5 bg-purple-200 rounded-b-full"></div>
          <div className="absolute top-0 left-16 w-6 h-7 bg-purple-200 rounded-b-full"></div>
          <div className="absolute top-0 right-16 w-7 h-6 bg-purple-200 rounded-b-full"></div>
          <div className="absolute top-0 right-6 w-6 h-5 bg-purple-200 rounded-b-full"></div>
        </div>
        
        {/* Cake Top Layer */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-cyan-300 to-cyan-400 rounded-t-[50%] rounded-b-lg shadow-lg">
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-cyan-200 to-cyan-300 rounded-t-[50%]"></div>
          {/* Frosting drips */}
          <div className="absolute top-0 left-4 w-6 h-4 bg-cyan-200 rounded-b-full"></div>
          <div className="absolute top-0 left-14 w-5 h-6 bg-cyan-200 rounded-b-full"></div>
          <div className="absolute top-0 right-14 w-6 h-5 bg-cyan-200 rounded-b-full"></div>
          <div className="absolute top-0 right-4 w-5 h-4 bg-cyan-200 rounded-b-full"></div>
        </div>
        
        {/* Candle */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Candle stick */}
          <div className="relative w-3 h-16 bg-gradient-to-r from-red-400 via-pink-300 to-red-400 rounded-t-sm shadow-md">
            {/* Candle stripes */}
            <div className="absolute top-2 inset-x-0 h-1 bg-white/30"></div>
            <div className="absolute top-8 inset-x-0 h-1 bg-white/30"></div>
          </div>
          {/* Candle wick */}
          <div className="absolute -top-2 w-0.5 h-3 bg-gray-800"></div>
          
          {/* Flame */}
          {candleLit && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="relative w-6 h-10 bg-gradient-to-t from-yellow-400 via-orange-500 to-yellow-300 rounded-full animate-pulse"
                style={{
                  clipPath: 'polygon(50% 0%, 70% 30%, 100% 50%, 70% 70%, 50% 100%, 30% 70%, 0% 50%, 30% 30%)',
                  filter: 'blur(1px)',
                  animation: 'flicker 0.3s infinite alternate'
                }}
              ></div>
              <div className="absolute inset-0 w-3 h-6 left-1/2 top-2 -translate-x-1/2 bg-gradient-to-t from-yellow-200 to-white rounded-full blur-sm opacity-80"></div>
              <div className="absolute -inset-4 bg-orange-400/30 rounded-full blur-xl animate-pulse"></div>
            </div>
          )}
        </div>
        
        {candleLit && (
          <div className="absolute inset-0 pointer-events-none" 
            style={{
              boxShadow: '0 0 80px 40px rgba(251, 191, 36, 0.4)',
              filter: 'blur(20px)'
            }}
          ></div>
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
