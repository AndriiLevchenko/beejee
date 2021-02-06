import {combineReducers} from 'redux';
import tasksReducer from './tasksReducer';
import createReducer from './createReducer';
import authReducer from './authReducer';

export default combineReducers({
	tasksReducer,
	createReducer,
	authReducer
});






