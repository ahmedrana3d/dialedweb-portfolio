// atoms.js
import { atom } from 'recoil';

export const loadingProgress = atom({
  key: 'loadingProgress', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const enterClicked = atom({
  key: "enterClicked" ,// unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
