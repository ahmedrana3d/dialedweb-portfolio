// state.js
import { proxy } from "valtio";

const state = proxy({
  step: 0,
  enterClicked: false,
  loadingProgress: 0,
  reverse: false,
  play: false,
  setPlay(newPlay) {
    state.play = newPlay;
  },
});

export default state;
