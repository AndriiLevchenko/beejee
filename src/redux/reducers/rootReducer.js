import {combineReducers} from 'redux';
import personsReducer from './personsReducer';
import createReducer from './createReducer';
import authReducer from './authReducer';

export default combineReducers({
	personsReducer,
	createReducer,
	authReducer
});






