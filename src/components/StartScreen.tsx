import { Button } from "@/components/ui/button";
import peachPanda from "@/assets/peach-panda.png";

interface StartScreenProps {
  onNext: () => void;
}

export const StartScreen = ({ onNext }: StartScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8">
      <div className="animate-float">
        <img 
          src={peachPanda} 
          alt="Cute character" 
          className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
        />
      </div>
      
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-hand neon-text font-bold leading-tight">
          A Cutiepie was born today, 20 years ago!
        </h1>
        
        <p className="text-2xl md:text-3xl font-hand neon-pink-text">
          Yes, it's YOU! A little surprise awaits...
        </p>
      </div>
      
      <Button
        onClick={onNext}
        size="lg"
        className="mt-6 text-2xl px-12 py-8 font-hand neon-pink-border bg-neon-pink/20 hover:bg-neon-pink/40 text-foreground transition-all hover:scale-110"
      >
        🎁 Start the surprise
      </Button>
    </div>
  );
};
