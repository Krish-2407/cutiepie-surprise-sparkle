import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BuntingDecoration } from "@/components/BuntingDecoration";

interface CakeScreenProps {
  onNext: () => void;
}

export const CakeScreen = ({ onNext }: CakeScreenProps) => {
  const [step, setStep] = useState<"decorate" | "light" | "complete">("decorate");
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string; color: string; type: 'circle' | 'square' | 'star' | 'sparkle' | 'swirl' }>>([]);
  const [candleLit, setCandleLit] = useState(false);

  const handleDecorate = () => {
    const types: Array<'circle' | 'square' | 'star' | 'sparkle' | 'swirl'> = ['circle', 'square', 'star', 'sparkle', 'swirl'];
    const brightColors = ['#ea00ff', '#00ffff', '#ffff00', '#ff00ff', '#00ff00', '#ff0099', '#00ffaa', '#ff6600', '#ff3366', '#66ff33'];
    
    const newConfetti = Array.from({ length: 250 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.2}s`,
      color: brightColors[Math.floor(Math.random() * brightColors.length)],
      type: types[Math.floor(Math.random() * types.length)]
    }));
    setConfetti(newConfetti);
    
    setTimeout(() => {
      setConfetti([]);
      setStep("light");
    }, 4000);
  };

  const handleLight = () => {
    setCandleLit(true);
    setTimeout(() => {
      setStep("complete");
    }, 1500);
  };

  const getConfettiShape = (type: 'circle' | 'square' | 'star' | 'sparkle' | 'swirl') => {
    if (type === 'circle') return 'rounded-full';
    if (type === 'square') return 'rotate-45';
    if (type === 'sparkle') return 'animate-spin';
    if (type === 'swirl') return 'animate-swirl';
    return ''; // star will use clip-path
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 relative overflow-hidden">
      <BuntingDecoration />
      {confetti.map((piece) => {
        const isSwirl = piece.type === 'swirl';
        const isSparkle = piece.type === 'sparkle';
        const isStar = piece.type === 'star';
        
        return (
          <div
            key={piece.id}
            className={`absolute ${isSwirl ? 'animate-swirl-up' : 'animate-confetti'} ${getConfettiShape(piece.type)}`}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              backgroundColor: isSwirl ? 'transparent' : piece.color,
              width: isSwirl ? '20px' : isStar ? '14px' : isSparkle ? '8px' : '12px',
              height: isSwirl ? '20px' : isStar ? '14px' : isSparkle ? '8px' : '12px',
              top: isSwirl ? '100vh' : '-10px',
              bottom: isSwirl ? '0' : 'auto',
              clipPath: isStar ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 
                       isSparkle ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined,
              boxShadow: isSwirl ? 'none' : `0 0 12px ${piece.color}, 0 0 24px ${piece.color}`,
              border: isSwirl ? `3px solid ${piece.color}` : 'none',
              borderRadius: isSwirl ? '50% 50% 50% 50% / 60% 60% 40% 40%' : undefined,
              transform: isSwirl ? 'rotate(0deg)' : undefined
            }}
          />
        );
      })}
      
      {/* Beautiful Birthday Cake */}
      <div className="relative h-96 flex items-end justify-center">
        {/* Cake Stand/Plate */}
        <div className="absolute bottom-0 w-80 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-lg"></div>
        
        {/* Bottom Tier (Largest) */}
        <div className="z-10 absolute bottom-4 w-72 h-32 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 rounded-2xl shadow-2xl">
          {/* Frosting texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl"></div>
          
          {/* Decorative dots */}
          <div className="absolute top-1/2 left-4 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-12 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-12 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-4 w-3 h-3 bg-white rounded-full"></div>
          
          {/* Wavy frosting top */}
          <svg className="absolute -top-0 rotate-180 inset-x-0 w-full h-6" preserveAspectRatio="none" viewBox="0 0 288 24">
            <path d="M0,12 Q18,0 36,12 T72,12 T108,12 T144,12 T180,12 T216,12 T252,12 T288,12 L288,24 L0,24 Z" fill="#f353a6ff" />
          </svg>
        </div>
        
        {/* Middle Tier */}
        <div className="z-9 absolute bottom-32 w-56 h-28 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl shadow-xl">
          {/* Frosting texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl"></div>
          
          {/* Decorative dots */}
          <div className="absolute top-1/2 left-6 w-2.5 h-2.5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-6 w-2.5 h-2.5 bg-white rounded-full"></div>
          
          {/* Wavy frosting top */}
          <svg className="absolute -top-0 rotate-180 inset-x-0 w-full h-6" preserveAspectRatio="none" viewBox="0 0 224 24">
            <path d="M0,12 Q16,0 32,12 T64,12 T96,12 T128,12 T160,12 T192,12 T224,12 L224,24 L0,24 Z" fill="#a24df7ff" />
          </svg>
        </div>
        
        {/* Top Tier (Smallest) */}
        <div className="z-0 absolute bottom-56 w-40 h-24 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 rounded-2xl shadow-lg">
          {/* Frosting texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl"></div>
          
          {/* Decorative dots */}
          <div className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-4 w-2 h-2 bg-white rounded-full"></div>
          
          {/* Wavy frosting top */}
          <svg className="absolute -top-0 rotate-180 inset-x-0 w-full h-6" preserveAspectRatio="none" viewBox="0 0 160 24">
            <path d="M0,12 Q13,0 26,12 T52,12 T78,12 T104,12 T130,12 T160,12 L160,24 L0,24 Z" fill="#0b899cff" />
          </svg>
        </div>
        
        {/* Candle on top tier */}
        <div className="absolute bottom-80 flex flex-col items-center">
          {/* Candle stick with stripes */}
          <div className="relative w-4 h-20 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-t-lg shadow-lg">
            <div className="absolute top-3 inset-x-0 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute top-8 inset-x-0 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute top-13 inset-x-0 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
          </div>
          
          {/* Wick */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-800 rounded-sm"></div>
          
          {/* Flame */}
          {candleLit && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-pulse">
              {/* Outer glow */}
              <div className="absolute -inset-6 bg-orange-400/40 rounded-full blur-2xl"></div>
              
              {/* Main flame */}
              <div className="relative w-8 h-12 bg-gradient-to-t from-yellow-500 via-orange-500 to-yellow-300 rounded-full"
                style={{
                  clipPath: 'polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)',
                  filter: 'blur(0.5px)',
                }}
              ></div>
              
              {/* Inner bright core */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-7 bg-gradient-to-t from-yellow-200 to-white rounded-full opacity-90 blur-sm"></div>
            </div>
          )}
        </div>
        
        {/* Overall glow when candle is lit */}
        {candleLit && (
          <div className="absolute inset-0 pointer-events-none" 
            style={{
              boxShadow: '0 0 100px 50px rgba(251, 191, 36, 0.3)',
              filter: 'blur(30px)'
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
