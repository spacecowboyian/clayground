import { Hero } from './sections/Hero';
import { Ticker } from './sections/Ticker';
import { HowItWorks } from './sections/HowItWorks';
import { Stories } from './sections/Stories';
import { Press } from './sections/Press';
import { Faq } from './sections/Faq';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Ticker />
        <HowItWorks />
        <Stories />
        <Press />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
