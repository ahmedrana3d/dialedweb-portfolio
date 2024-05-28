// state.js
import { proxy } from 'valtio';

const state = proxy({ step: 0 });

export default state;