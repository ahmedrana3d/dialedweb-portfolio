import React, { useState, useEffect, useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { throttle } from 'lodash';
import state from '../../state/state'; // Import the shared state

const MAX_STEPS = 7; // Set the maximum number of steps
const TIMEOUT_STEPS = [4000, 2000, 1000, 1500, 1500, 1500, 1500]; // Timeout durations for each step

const ScrollDetector = () => {
  const snap = useSnapshot(state);
  const [isThrottled, setIsThrottled] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const handleScroll = useCallback(
    throttle((direction) => {
      if (!isThrottled) {
        if (direction === 'down' && snap.step < MAX_STEPS) {
          state.step = snap.step + 1;
          state.reverse = false;
        } else if (direction === 'up' && snap.step > 0) {
          state.step = snap.step - 1;
          state.reverse = true;
        }
        setIsThrottled(true);

        // Set timeout to reset the throttle after the specified delay
        setTimeout(() => {
          setIsThrottled(false);
        }, TIMEOUT_STEPS[snap.step - 1] || 0);
      }
    }, 300), // Throttle delay to prevent excessive firing
    [isThrottled, snap.step]
  );

  const onWheel = (e) => {
    if (e.deltaY > 0) {
      handleScroll('down');
    } else {
      handleScroll('up');
    }
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
  };

  const onTouchMove = (e) => {
    if (touchStartY !== null) {
      const touch = e.touches[0];
      const touchEndY = touch.clientY;
      const direction = touchStartY > touchEndY ? 'down' : 'up';
      handleScroll(direction);
    }
  };

  const onTouchEnd = () => {
    setTouchStartY(null);
  };

  useEffect(() => {
    window.addEventListener('wheel', onWheel);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onWheel, onTouchStart, onTouchMove, onTouchEnd]);

  return <div className="scroll-detector"></div>;
};

export default ScrollDetector;
