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
      
      {/* CSS Cake - Sticker Style */}
      <div className="relative">
        {/* Cake Base - Bottom Layer */}
        <div className="relative w-72 h-28 rounded-lg overflow-hidden shadow-2xl">
          {/* Cake body with layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-orange-400"></div>
          {/* Horizontal layer lines */}
          <div className="absolute inset-x-0 top-1/3 h-1 bg-gradient-to-r from-green-500 via-teal-500 to-green-500"></div>
          <div className="absolute inset-x-0 top-2/3 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
          {/* Wavy frosting top */}
          <svg className="absolute inset-x-0 top-0 w-full h-8" preserveAspectRatio="none" viewBox="0 0 288 32">
            <path d="M0,16 Q24,4 48,16 T96,16 T144,16 T192,16 T240,16 T288,16 L288,0 L0,0 Z" fill="#ec4899" opacity="0.9"/>
          </svg>
          {/* Bottom frosting wave */}
          <svg className="absolute inset-x-0 bottom-0 w-full h-6" preserveAspectRatio="none" viewBox="0 0 288 24">
            <path d="M0,8 Q24,0 48,8 T96,8 T144,8 T192,8 T240,8 T288,8 L288,24 L0,24 Z" fill="rgba(236, 72, 153, 0.3)"/>
          </svg>
        </div>
        
        {/* Cake Top Layer */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-56 h-24 rounded-lg overflow-hidden shadow-xl">
          {/* Cake body */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-300 to-yellow-400"></div>
          {/* Middle decorative wave */}
          <div className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
          {/* Wavy frosting top */}
          <svg className="absolute inset-x-0 top-0 w-full h-8" preserveAspectRatio="none" viewBox="0 0 224 32">
            <path d="M0,16 Q20,6 40,16 T80,16 T120,16 T160,16 T200,16 T224,16 L224,0 L0,0 Z" fill="#ec4899" opacity="0.95"/>
          </svg>
          {/* Bottom frosting wave */}
          <svg className="absolute inset-x-0 bottom-0 w-full h-6" preserveAspectRatio="none" viewBox="0 0 224 24">
            <path d="M0,8 Q20,2 40,8 T80,8 T120,8 T160,8 T200,8 T224,8 L224,24 L0,24 Z" fill="rgba(236, 72, 153, 0.4)"/>
          </svg>
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
