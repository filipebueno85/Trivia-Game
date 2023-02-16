import { combineReducers } from 'redux';

import configs from './configs';
import feedback from './feedback';
import game from './game';
import player from './player';
import ranking from './ranking';

export default combineReducers({
  player,
  game,
  configs,
  ranking,
  feedback,
});
