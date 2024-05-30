// state.js
import { proxy } from 'valtio';

const state = proxy({ step: 0 , enterClicked : false, loadingProgress : 0  });

export default state;