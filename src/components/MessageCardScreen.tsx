import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BuntingDecoration } from "@/components/BuntingDecoration";

interface MessageCardScreenProps {
  onNext: () => void;
}

export const MessageCardScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play the song when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 relative overflow-hidden">
      {/* Hidden audio player for background music */}
      <audio 
        ref={audioRef}
        src="/mann-mera.mp3" 
        loop
        className="hidden"
      />
      <BuntingDecoration />
      <h2 className="text-3xl md:text-4xl font-hand neon-text text-center">
        A Special Message
      </h2>
      
      <div className="relative max-w-2xl">
        {!isOpen ? (
          <button
            onClick={handleOpen}
            className="neon-pink-border rounded-3xl p-8 md:p-12 bg-card/50 hover:bg-card/70 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-4">
                <span className="text-6xl animate-float" style={{ animationDelay: '0s' }}>🎈</span>
                <span className="text-6xl animate-float" style={{ animationDelay: '0.3s' }}>🎈</span>
                <span className="text-6xl animate-float" style={{ animationDelay: '0.6s' }}>🎈</span>
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-4xl md:text-5xl font-hand neon-pink-text font-bold">
                  Happy Birthday To You
                </h3>
                <p className="text-2xl font-hand text-muted-foreground">
                  Tap to Open
                </p>
              </div>
            </div>
          </button>
        ) : (
          <div className="neon-border rounded-3xl p-8 md:p-12 bg-card/50 animate space-y-6">
            <div className="flex justify-center gap-3 mb-4">
              <span className="text-5xl">🎈</span>
              <span className="text-5xl">🎉</span>
              <span className="text-5xl">🎈</span>
            </div>
            
            <p className="text-xl md:text-2xl font-hand text-center leading-relaxed">
              Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the world today and always. 
              You have this special way of making everything around you brighter, your smile, your kindness, 
              and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, 
              and moments that make your heart happy.
            </p>
            
            <div className="flex justify-center gap-3 mt-4">
              <span className="text-5xl">💝</span>
              <span className="text-5xl">✨</span>
              <span className="text-5xl">💝</span>
            </div>
          </div>
        )}
      </div>
      
      {/* {isOpen && (
        <Button
          onClick={onNext}
          size="lg"
          className="text-2xl px-12 py-8 font-hand neon-cyan-text border-2 border-neon-cyan bg-neon-cyan/20 hover:bg-neon-cyan/40 transition-all hover:scale-110 animate-fade-in"
        >
          Next →
        </Button>
      )} */}
    </div>
  );
};
