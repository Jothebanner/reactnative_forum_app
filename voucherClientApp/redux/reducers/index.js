import { combineReducers } from 'redux';
import postTextReducer from './postTextReducer';
import postImageReducer from './postImageReducer';
import postImageNameReducer from './postImageNameReducer';
import deleteToggleReducer from './deleteToggleReducer';

export default combineReducers({postTextReducer, postImageReducer, postImageNameReducer, deleteToggleReducer});