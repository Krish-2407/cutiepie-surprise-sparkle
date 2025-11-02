import { useState, useEffect } from "react";

interface CountdownProps {
  onComplete: () => void;
}

export const Countdown = ({ onComplete }: CountdownProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [count, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-neon-pink/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <h2 className="text-3xl md:text-4xl font-hand neon-text text-center animate-slide-up">
        Crafting your special moment
      </h2>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 animate-bounce-in">
        <div className="absolute inset-0 rounded-full neon-border animate-pulse-neon" />
        <div className="absolute inset-4 rounded-full border-4 border-neon-cyan/20 animate-pulse-neon" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl md:text-[12rem] font-hand neon-cyan-text font-bold animate-shimmer">
            {count > 0 ? count : "✨"}
          </span>
        </div>
        {/* Sparkle effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-yellow rounded-full animate-sparkle"
            style={{
              left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
              top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
