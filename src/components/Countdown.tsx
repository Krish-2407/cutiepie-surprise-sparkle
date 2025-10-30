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
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4">
      <h2 className="text-3xl md:text-4xl font-hand neon-text text-center">
        Crafting your special moment
      </h2>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full neon-border animate-pulse-neon" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl md:text-[12rem] font-hand neon-cyan-text font-bold">
            {count > 0 ? count : "✨"}
          </span>
        </div>
      </div>
    </div>
  );
};
