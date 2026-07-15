import { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { PlayScreen } from './screens/PlayScreen';
import { PrintScreen } from './screens/PrintScreen';
import { RulesScreen } from './screens/RulesScreen';

type Screen = 'home' | 'play' | 'print' | 'rules';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  switch (screen) {
    case 'play':
      return <PlayScreen onHome={() => setScreen('home')} onRules={() => setScreen('rules')} />;
    case 'print':
      return <PrintScreen onHome={() => setScreen('home')} />;
    case 'rules':
      return <RulesScreen onBack={() => setScreen('play')} />;
    case 'home':
    default:
      return <HomeScreen onPlay={() => setScreen('play')} onPrint={() => setScreen('print')} />;
  }
}
