import LoadingScreen from "./Components/LoadingScreen";
import Experience from "./Experience";
import MainSection from "./MainSection";
import React from "react";
import { useWheel } from '@use-gesture/react'
import { Lethargy } from 'lethargy'
import { useSnapshot } from 'valtio';
import state from '../state/state';

const TIMEOUTS = {
  1: 4000,
  2: 2500,
  3: 1500,
  4: 2000,
  5: 2000,
  6: 2000,
  7: 2000,
  8: 3000,
  9: 3000,
  10: 3000,
  11: 3000,
  12: 3000,
};

const lethargy = new Lethargy();

const Home = () => {
  const snapshot = useSnapshot(state);
  const [scrollFired, setScrollFired] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(0);
  const [currentReverse, setCurrentReverse] = React.useState(false);
  const [scrollDisabled, setScrollDisabled] = React.useState(false);

  const wheel = useWheel(({ event, first, last, delta: [, deltaY] }) => {

    if (!first && !last && !scrollDisabled) {
      const scrolling = lethargy.check(event) !== false;
      if (scrolling && !scrollFired) {
        if (deltaY > 0) {
          setCurrentItem(prevItem => prevItem + 1);
          setCurrentReverse(false);
        }
        if (deltaY < 0 && currentItem > 0) {
          setCurrentItem(prevItem => prevItem - 1);
          setCurrentReverse(true);
        }
        setScrollFired(true);
        const timeout = TIMEOUTS[currentItem + 1] || 0; // Get timeout for next step
        setScrollDisabled(true);
        setTimeout(() => {
console.log("SCROLL")
          setScrollDisabled(false)
        }, timeout);
      }
    } else {
      setScrollFired(false);
    }
  });

  React.useEffect(() => {
    state.step = currentItem;
    state.reverse = currentReverse;
    console.log(state.step, state.reverse);
  }, [currentItem, currentReverse]);

  return (
    <div {...wheel()}>
      <LoadingScreen />
      <Experience />
        <MainSection />
    </div>
  );
};

export default Home;
