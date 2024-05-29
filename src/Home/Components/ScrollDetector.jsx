// ScrollDetector.jsx
import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../../state/state'; // Import the shared state

const MAX_STEPS = 1; // Set the maximum number of steps

const ScrollDetector = () => {
  const [scrolling, setScrolling] = useState(false);
  const snapshot = useSnapshot(state);

  useEffect(() => {
    let touchStartY = 0;

    const handleScroll = (event) => {
      if (scrolling) return;

      setScrolling(true);
      let newStep = snapshot.step;

      if (event.deltaY > 0) {
        // Scrolling down
        newStep = Math.min(newStep + 1, MAX_STEPS);
      } else {
        // Scrolling up
        newStep = Math.max(newStep - 1, 0);
      }

      state.step = newStep;
    //   triggerAnimation(newStep);

      // Prevent further scrolling until animation is complete
      setTimeout(() => {
        setScrolling(false);
      }, 4000); // Adjust based on your animation duration
    };

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
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
    //   triggerAnimation(newStep);

      // Prevent further scrolling until animation is complete
      setTimeout(() => {
        setScrolling(false);
      }, 4000); // Adjust based on your animation duration
    };

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
