import { combineReducers } from 'redux';

import { postReducer } from '../modules/posts/reducer';
import { userReducer } from '../modules/user/reducer';

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
});

export default rootReducer;
