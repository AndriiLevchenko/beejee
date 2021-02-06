
import axios from  './../../axios/axios-newTask';

const FETCH_TASKS_START='FETCH_TASKS_START';
const FETCH_TASKS_SUCCESS='FETCH_TASKS_SUCCESS';
const FETCH_TASKS_ERROR='FETCH_TASKS_ERROR';
const FETCH_TASK_SUCCESS='FETCH_TASK_SUCCESS';
const PAGE_UP='PAGE_UP';
const PAGE_DOWN='PAGE_DOWN';

const initialState={
	tasks: [], 
	loading: false,
	error: null,
	pageLength: 3,
	pageNumber: 1,
	firstTask: 0,
	lastTask: 2,
	theRest: 0
};

export default function  tasksReducer(state=initialState, action){
	switch(action.type){
		case FETCH_TASKS_START:
			return {
				...state,
				loading: true
			}
		case FETCH_TASKS_SUCCESS:
			return {
				...state,
				loading: false,
				tasks: action.tasks
				//theRest: action.tasks/state.pageLength
			}
		case FETCH_TASK_SUCCESS:
			return {
				...state,
				loading: false,
				quiz: action.quiz
			}
		case FETCH_TASKS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}

		case PAGE_UP:
			if(state.pageNumber <= 1){
				return {
					...state,
					
				}
			} else {
				return {
					...state,
					pageNumber: state.pageNumber - 1,
					firstTask: state.firstTask- 3,
					lastTask: state.lastTask - 3
				}
			}
		case PAGE_DOWN:	
			if(state.pageNumber >= (state.tasks.length)/3){
				return {
					...state,
					firstTask: state.firstTask,
					lastTask: state.lastTask
				}
			} else {
				return {
					...state,
					pageNumber: state.pageNumber + 1,
					firstTask: state.firstTask + 3,
					lastTask: state.lastTask + 3
				}
			}
		
		default:
		return state
	}
}

export function fetchTasks(){
	return async dispatch=>{
		dispatch(fetchTasksStart());
			try{
	  			const response = await axios.get('tasks.json'); 
	  			console.log(response);
	  			const tasks=[];

	  			Object.values(response.data).forEach((key, index)=>{
	  				console.log(Object.keys(response.data)[index]);
	  				tasks.push({
	  					email: key.email,
	  					name: key.name,
	  					status: key.status,
	  					taskText: key.taskText,
	  					id: Object.keys(response.data)[index]
	  				})
	  			});
	  		
	  	dispatch(fetchTasksSuccess(tasks));
	  		} catch(error) {
	  			dispatch(fetchTasksError(error));
	  		}
	}
}
export function fetchTaskById(personId){
	console.log(personId);
	return async dispatch=>{
		dispatch(fetchTasksStart());
			try{
	  			const response = await axios.get(`quizes/${personId}.json`); 
	  			const person=response.data;
	  			console.log(response.data);
	  			
	  	dispatch(fetchTaskSuccess(person));
	  		} catch(error) {
	  			dispatch(fetchTasksError(error));
	  		}
	}
}

export function fetchTasksStart(){
	return {type: FETCH_TASKS_START}
}
export function fetchTasksSuccess(tasks){
	return {type: FETCH_TASKS_SUCCESS,
			tasks
		   }
}
export function fetchTaskSuccess(quiz){
	console.log(quiz);
	return {type: FETCH_TASK_SUCCESS,
			quiz
		   }
}
export function fetchTasksError(error){
	return {type: FETCH_TASKS_ERROR,
			error
		   }
}
export function pageUp(){
	return {type: PAGE_UP}
}
export function pageDown(tasks){
	return {type: PAGE_DOWN,
		   }
}

