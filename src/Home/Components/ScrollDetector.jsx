import React, { useState, useEffect } from 'react';
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

    console.log(state.reverse);

    // Prevent further scrolling until animation is complete
    setTimeout(() => {
      setScrolling(false);
    }, 4000); // Adjust based on your animation duration
  }, 1000); // Throttle interval in milliseconds

  const handleTouchStart = (event) => {
    touchStartY = event.touches[0].clientY;
  };

  const handleTouchMove = throttle((event) => {
    if (scrolling) return;

    const touchEndY = event.changedTouches[0].clientY;
    setScrolling(true);
    let newStep = snapshot.step;

    if (touchStartY > touchEndY) {
      // Scrolling down
      newStep = Math.min(newStep + 1, MAX_STEPS);
    } else {
      // Scrolling up
      newStep = Math.max(newStep - 1, 0);
    }

    state.step = newStep;

    // Prevent further scrolling until animation is complete
    setTimeout(() => {
      setScrolling(false);
    }, 4000); // Adjust based on your animation duration
  }, 1000); // Throttle interval in milliseconds

  useEffect(() => {
    let touchStartY = 0;

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrolling, snapshot.step]);

  return <div className="scroll-detector"></div>;
};

export default ScrollDetector;
