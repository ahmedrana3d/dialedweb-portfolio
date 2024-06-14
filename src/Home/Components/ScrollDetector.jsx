import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import throttle from 'lodash/throttle';
import state from '../../state/state'; // Import the shared state

const MAX_STEPS = 7; // Set the maximum number of steps
const TIMEOUT_STEPS = [4000, 2000, 1000, 1500, 1500, 1500, 1500]; // Timeout durations for each step

const ScrollDetector = () => {
  const [scrolling, setScrolling] = useState(false);
  const snapshot = useSnapshot(state);
  const xDownRef = useRef(null);
  const yDownRef = useRef(null);
  const timeoutRef = useRef(null);

  const getTimeoutDuration = (step) => {
    if (step >= 1 && step <= MAX_STEPS) {
      return TIMEOUT_STEPS[step - 1]; // Using zero-based index for array access
    }
    return TIMEOUT_STEPS[0]; // Default timeout for invalid steps, if any
  };

  const handleScroll = throttle((event) => {
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

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
      timeoutRef.current = null;
    }, getTimeoutDuration(newStep));
  }, 2000); // Throttle interval in milliseconds

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDownRef.current = firstTouch.clientX;
    yDownRef.current = firstTouch.clientY;
  };

  const handleTouchMove = throttle((evt) => {
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

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
      timeoutRef.current = null;
    }, getTimeoutDuration(newStep));

    // Reset values
    xDownRef.current = null;
    yDownRef.current = null;
  }, 300); // Throttle interval in milliseconds

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