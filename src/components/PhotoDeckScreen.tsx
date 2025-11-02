import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  { id: 3, src: memory4, alt: "Sweet moment 4" },
  { id: 3, src: memory5, alt: "Sweet moment 5" },
  { id: 3, src: memory6, alt: "Sweet moment 6" },
  { id: 3, src: memory7, alt: "Sweet moment 7" },
];

export const PhotoDeckScreen = ({ onNext }: PhotoDeckScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
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
        Some Sweet Moments (Swipe the cards)
      </h2>
      
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="aspect-[3/4] relative neon-pink-border rounded-2xl overflow-hidden bg-card/50 transition-smooth">
          <img
            key={currentIndex}
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            className="w-full h-full object-cover animate-fade-in"
          />
        </div>
        
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary/30 neon-border hover:bg-primary/50 transition-smooth hover:scale-110 animate-pulse-neon"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary/30 neon-border hover:bg-primary/50 transition-smooth hover:scale-110 animate-pulse-neon"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-neon-pink w-6' : 'bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      <Button
        onClick={onNext}
        size="lg"
        className="text-2xl px-12 py-8 font-hand neon-pink-border bg-neon-pink/20 hover:bg-neon-pink/40 text-foreground transition-smooth hover:scale-110 animate-bounce-in"
      >
        💌 Open My Message
      </Button>
    </div>
  );
};
