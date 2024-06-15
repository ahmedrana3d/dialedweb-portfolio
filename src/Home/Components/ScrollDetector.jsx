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


  return <div className="scroll-detector"></div>;
};

export default ScrollDetector;
