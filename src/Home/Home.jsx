import LoadingScreen from "./Components/LoadingScreen";
import Experience from "./Experience";
import MainSection from "./MainSection";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useWheel, useDrag } from '@use-gesture/react';
import { Lethargy } from 'lethargy';
import { useSnapshot } from 'valtio';
import state from '../state/state';

const TIMEOUTS = {
  1: 4000,
  2: 2500,
  3: 2500,
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
  const scrollFiredRef = useRef(false);
  const currentItemRef = useRef(0);
  const currentReverseRef = useRef(false);
  const scrollDisabledRef = useRef(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [currentReverse, setCurrentReverse] = useState(false);

  const handleScroll = useCallback((deltaY) => {
    if (!scrollDisabledRef.current) {
      if (deltaY > 0) {
        currentItemRef.current += 1;
        currentReverseRef.current = false;
      } else if (deltaY < 0 && currentItemRef.current > 0) {
        currentItemRef.current -= 1;
        currentReverseRef.current = true;
      }

      setCurrentItem(currentItemRef.current);
      setCurrentReverse(currentReverseRef.current);
      scrollFiredRef.current = true;

      const timeout = TIMEOUTS[currentItemRef.current + 1] || 0;
      scrollDisabledRef.current = true;
      setTimeout(() => {
        scrollDisabledRef.current = false;
      }, timeout);
    }
  }, []);

  const wheel = useWheel(({ event, first, last, delta: [, deltaY] }) => {
    if (!first && !last && !scrollDisabledRef.current) {
      const scrolling = lethargy.check(event) !== false;
      if (scrolling && !scrollFiredRef.current) {
        handleScroll(deltaY);
      }
    } else {
      scrollFiredRef.current = false;
    }
  });

  const drag = useDrag(({ first, last, movement: [, my], memo = currentItemRef.current }) => {
    if (!first && !last && !scrollDisabledRef.current) {
      if (my > 50) { // Swipe down
        handleScroll(-1);
      } else if (my < -50) { // Swipe up
        handleScroll(1);
      }
    }
    return memo;
  });

  useEffect(() => {
    state.step = currentItem;
    state.reverse = currentReverse;
    console.log(state.step, state.reverse);
  }, [currentItem, currentReverse]);

  return (
    <div {...wheel()} {...drag()} style={{ touchAction: 'none' }}>
      <LoadingScreen />
      <Experience />
      <div className=" hidden">
      {/* <MainSection /> */}
      </div>
    </div>
  );
};

export default Home;
