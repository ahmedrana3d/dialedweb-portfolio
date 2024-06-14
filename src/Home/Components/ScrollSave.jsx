import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../../state/state'; // Import the shared state

const MAX_STEPS = 7; // Set the maximum number of steps
const TIMEOUT_STEPS = [4000, 2000, 1000, 1500, 1500, 1500, 1500]; // Timeout durations for each step

const ScrollDetector = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isStepCompleted, setIsStepCompleted] = useState(true);
  const snapshot = useSnapshot(state);
  const xDownRef = useRef(null);
  const yDownRef = useRef(null);
  const lastScrollTopRef = useRef(0);

  const getTimeoutDuration = (step) => {
    if (step >= 1 && step <= MAX_STEPS) {
      return TIMEOUT_STEPS[step - 1]; // Using zero-based index for array access
    }
    return TIMEOUT_STEPS[0]; // Default timeout for invalid steps, if any
  };

  const updateStep = (direction) => {
    if (!isStepCompleted || scrolling) return;

    setScrolling(true);
    setIsStepCompleted(false);
    let newStep = snapshot.step;
    let reverseAnimation = snapshot.reverse;

    if (direction === 'down') {
      // Scrolling or swiping down
      newStep = Math.min(newStep + 1, MAX_STEPS);
      reverseAnimation = false;
    } else {
      // Scrolling or swiping up
      newStep = Math.max(newStep - 1, 0);
      reverseAnimation = true;
    }

    state.step = newStep;
    state.reverse = reverseAnimation;

    setTimeout(() => {
      setScrolling(false);
      setIsStepCompleted(true);
    }, getTimeoutDuration(newStep)); // Set timeout according to the step
  };

  const handleScroll = (event) => {
    if (scrolling || !isStepCompleted) return;

    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTopRef.current) {
      updateStep('down');
    } else if (st < lastScrollTopRef.current) {
      updateStep('up');
    }
    lastScrollTopRef.current = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  };

  const handleWheel = (event) => {
    if (scrolling || !isStepCompleted) return;

    if (event.deltaY > 0) {
      updateStep('down');
    } else {
      updateStep('up');
    }
  };

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDownRef.current = firstTouch.clientX;
    yDownRef.current = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDownRef.current || !yDownRef.current || scrolling || !isStepCompleted) {
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

    if (yDiff > 0) {
      // Swiping up
      updateStep('down');
    } else {
      // Swiping down
      updateStep('up');
    }

    // Reset values
    xDownRef.current = null;
    yDownRef.current = null;
  };

  const getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
    };
  }, [scrolling, isStepCompleted, snapshot.step]);

  return <div className="scroll-detector"></div>;
};

export default ScrollDetector;
