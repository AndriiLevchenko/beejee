
import axios from  './../../axios/axios-newTask';

const PAGE_UP='PAGE_UP';
const PAGE_DOWN='PAGE_DOWN';


const initialState={
	pageLength: 3,
	firstTask: 0,
	lastTask: 2
};

export default function  paginationReducer(state=initialState, action){
	switch(action.type){
		case PAGE_UP:
			return {
				...state,
				loading: true
			}
		case PAGE_DOWN:
			return {
				...state,
				loading: false,
				tasks: action.tasks
			}
		
		
		default:
		return state
	}
}



export function pageUp(){

	return {type: PAGE_UP}
}
export function pageDown(tasks){
	return {type: PAGE_DOWN,
		   }
}
