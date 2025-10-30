import { useState } from "react";
import { Countdown } from "@/components/Countdown";
import { StartScreen } from "@/components/StartScreen";
import { CakeScreen } from "@/components/CakeScreen";
import { BalloonScreen } from "@/components/BalloonScreen";
import { PhotoDeckScreen } from "@/components/PhotoDeckScreen";
import { MessageCardScreen } from "@/components/MessageCardScreen";
import { GiftScreen } from "@/components/GiftScreen";

const Index = () => {
  const [screen, setScreen] = useState(1);

  const nextScreen = () => {
    setScreen((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen">
      {screen === 1 && <Countdown onComplete={nextScreen} />}
      {screen === 2 && <StartScreen onNext={nextScreen} />}
      {screen === 3 && <CakeScreen onNext={nextScreen} />}
      {screen === 4 && <BalloonScreen onNext={nextScreen} />}
      {screen === 5 && <PhotoDeckScreen onNext={nextScreen} />}
      {screen === 6 && <MessageCardScreen onNext={nextScreen} />}
      {screen === 7 && <GiftScreen />}
    </main>
  );
};

export default Index;
