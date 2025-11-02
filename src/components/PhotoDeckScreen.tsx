import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";
import memory7 from "@/assets/memory-7.jpg";

interface PhotoDeckScreenProps {
  onNext: () => void;
}

const photos = [
  { id: 1, src: memory1, alt: "Sweet moment 1" },
  { id: 2, src: memory2, alt: "Sweet moment 2" },
  { id: 3, src: memory3, alt: "Sweet moment 3" },
  { id: 4, src: memory4, alt: "Sweet moment 4" },
  { id: 5, src: memory5, alt: "Sweet moment 5" },
  { id: 6, src: memory6, alt: "Sweet moment 6" },
  { id: 7, src: memory7, alt: "Sweet moment 7" },
];

export const PhotoDeckScreen = ({ onNext }: PhotoDeckScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart !== null) {
      const offset = clientX - dragStart;
      setDragOffset(offset);
    }
  };

  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        // Swipe right - previous
        setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      } else {
        // Swipe left - next
        setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      }
    }
    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8 relative overflow-hidden">
      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${5 + Math.random() * 2}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <h2 className="text-3xl md:text-4xl font-hand neon-text text-center animate-slide-up">
        Some Sweet Moments
      </h2>
      <p className="text-xl font-hand neon-pink-text/70 text-center animate-shimmer -mt-4">
        👆 Swipe to explore
      </p>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-md h-[500px] animate-fade-in perspective-1000"
      >
        {/* Stack of cards - show 3 cards behind the current one */}
        {[2, 1, 0].map((offset) => {
          const index = (currentIndex + offset) % photos.length;
          const isTopCard = offset === 0;
          const zIndex = offset === 0 ? 30 : offset === 1 ? 20 : 10;
          const scale = offset === 0 ? 1 : offset === 1 ? 0.95 : 0.9;
          const yOffset = offset * 8;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.7 : 0.4;
          
          return (
            <div
              key={`${index}-${offset}`}
              className="absolute inset-0 transition-all duration-300"
              style={{
                zIndex,
                transform: `translateY(${yOffset}px) scale(${scale}) ${
                  isTopCard && isDragging 
                    ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)` 
                    : ''
                }`,
                opacity,
                pointerEvents: isTopCard ? 'auto' : 'none',
              }}
            >
              <div 
                className={`aspect-[3/4] relative rounded-2xl overflow-hidden bg-card/50 shadow-2xl ${
                  isTopCard ? 'neon-pink-border cursor-grab active:cursor-grabbing' : 'border-2 border-muted-foreground/20'
                } ${isTopCard ? 'animate-float' : ''}`}
                style={{
                  animationDuration: '4s',
                  animationDelay: `${offset * 0.2}s`
                }}
                onMouseDown={(e) => isTopCard && handleDragStart(e.clientX)}
                onMouseMove={(e) => isTopCard && isDragging && handleDragMove(e.clientX)}
                onMouseUp={() => isTopCard && handleDragEnd()}
                onMouseLeave={() => isTopCard && isDragging && handleDragEnd()}
                onTouchStart={(e) => isTopCard && handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => isTopCard && isDragging && handleDragMove(e.touches[0].clientX)}
                onTouchEnd={() => isTopCard && handleDragEnd()}
              >
                <img
                  src={photos[index].src}
                  alt={photos[index].alt}
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
                {isTopCard && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress indicators */}
      <div className="flex gap-2 mt-4">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-neon-pink w-8 shadow-[0_0_10px_hsl(var(--neon-pink))]' 
                : 'bg-muted-foreground/30 w-2'
            }`}
          />
        ))}
      </div>
      
      <Button
        onClick={onNext}
        size="lg"
        className="text-2xl px-12 py-8 font-hand neon-pink-border bg-neon-pink/20 hover:bg-neon-pink/40 text-foreground transition-smooth hover:scale-110 animate-bounce-in mt-4"
      >
        💌 Open My Message
      </Button>
    </div>
  );
};
