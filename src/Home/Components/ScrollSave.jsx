import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import debounce from 'lodash/debounce';

// Assuming this is your shared state management solution (replace if needed)
import state from '../../state/state';

const MAX_STEPS = 7;

// Timeout durations for each step
const TIMEOUT_STEP_1 = 4000;
const TIMEOUT_STEP_2 = 2000;
const TIMEOUT_STEP_3 = 1000;
const TIMEOUT_STEP_4 = 1500;
const TIMEOUT_STEP_5 = 1500;
const TIMEOUT_STEP_6 = 1500;
const TIMEOUT_STEP_7 = 1500;

const ScrollDetector = () => {
  const [scrolling, setScrolling] = useState(false);
  const snapshot = useSnapshot(state);
  const xDownRef = useRef(null);
  const yDownRef = useRef(null);

  const getTimeoutDuration = (step) => {
    switch (step) {
      case 1:
        return TIMEOUT_STEP_1;
      case 2:
        return TIMEOUT_STEP_2;
      case 3:
        return TIMEOUT_STEP_3;
      case 4:
        return TIMEOUT_STEP_4;
      case 5:
        return TIMEOUT_STEP_5;
      case 6:
        return TIMEOUT_STEP_6;
      case 7:
        return TIMEOUT_STEP_7;
      default:
        return TIMEOUT_STEP_1; // Default timeout for other steps
    }
  };

  const handleScroll = debounce((event) => {
    if (scrolling) return;
    setScrolling(true);

    let newStep = snapshot.step;
    let reverseAnimation = snapshot.reverse;

    if (event.deltaY > 0) {
      // Scrolling down
      newStep = Math.min(newStep + 1, MAX_STEPS);
      reverseAnimation = false;
    } else {
      // Scrolling up
      newStep = Math.max(newStep - 1, 0);
      reverseAnimation = true;
    }

    state.step = newStep;
    state.reverse = reverseAnimation;

    setTimeout(() => {
      setScrolling(false);
      console.log("YOU CAN SCROLL", getTimeoutDuration(newStep));
    }, getTimeoutDuration(newStep));
  }, 10); // Debounce interval in milliseconds

  const handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0];
    xDownRef.current = firstTouch.clientX;
    yDownRef.current = firstTouch.clientY;
  };

  const handleTouchMove = debounce((evt) => {
    if (!xDownRef.current || !yDownRef.current || scrolling) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = xDownRef.current - xUp;
    const yDiff = yDownRef.current - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Horizontal swipe - ignored
      xDownRef.current = null;
      yDownRef.current = null;
      return;
    }

    setScrolling(true);

    let newStep = snapshot.step;

    if (yDiff > 0) {
      // Swiping up
      newStep = Math.min(newStep + 1, MAX_STEPS);
      state.reverse = false;
    } else {
      // Swiping down
      newStep = Math.max(newStep - 1, 0);
      state.reverse = true;
    }

    state.step = newStep;

    // Reset values
    xDownRef.current = null;
    yDownRef.current = null;

    setTimeout(() => {
      setScrolling(false);
      console.log("YOU CAN SCROLL", getTimeoutDuration(newStep));
    }, getTimeoutDuration(newStep));
  }, 1000); //

  const getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches;
  };

  useEffect(() => {
    const handleWheel = (event) => handleScroll(event);

    document.addEventListener('wheel', handleWheel);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
    };
  }, [scrolling, snapshot.step]);

  return <div className="scroll-detector"></div>;
};

export default ScrollDetector;
