import { useState } from 'react';
import { PlayScreen } from './screens/PlayScreen';
import { PrintScreen } from './screens/PrintScreen';
import { RulesScreen } from './screens/RulesScreen';

type Screen = 'play' | 'print' | 'rules';

export default function App() {
  const [screen, setScreen] = useState<Screen>('play');

  switch (screen) {
    case 'print':
      return <PrintScreen onBack={() => setScreen('play')} />;
    case 'rules':
      return <RulesScreen onBack={() => setScreen('play')} />;
    case 'play':
    default:
      return <PlayScreen onPrint={() => setScreen('print')} onRules={() => setScreen('rules')} />;
  }
}
