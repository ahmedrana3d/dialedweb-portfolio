import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import throttle from 'lodash/throttle';
import state from '../../state/state'; // Import the shared state

const MAX_STEPS = 2; // Set the maximum number of steps

const ScrollDetector = () => {
  const [scrolling, setScrolling] = useState(false);
  const snapshot = useSnapshot(state);

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

    // Prevent further scrolling until animation is complete
    setTimeout(() => {
      setScrolling(false);
    }, 4000); // Adjust based on your animation duration
  }, 1000); // Throttle interval in milliseconds

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDownRef.current = firstTouch.clientX;
    yDownRef.current = firstTouch.clientY;
  };

  const handleTouchMove = throttle((evt) => {
    if (!xDownRef.current || !yDownRef.current) {
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

    // Prevent further scrolling until animation is complete
    setTimeout(() => {
      setScrolling(false);
    }, 4000); // Adjust based on your animation duration
  }, 1000); // Throttle interval in milliseconds

  const getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches;
  };

  const xDownRef = useRef(null);
  const yDownRef = useRef(null);

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
