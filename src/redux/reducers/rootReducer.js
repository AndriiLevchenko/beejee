import {combineReducers} from 'redux';
import tasksReducer from './tasksReducer';
import createReducer from './createReducer';
import authReducer from './authReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
	tasksReducer,
	createReducer,
	authReducer,
	form: formReducer
});






