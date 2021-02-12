
import axios from  './../../axios/axios-newTask';

const FETCH_TASKS_START='FETCH_TASKS_START';
const FETCH_TASKS_SUCCESS='FETCH_TASKS_SUCCESS';
const FETCH_TASKS_ERROR='FETCH_TASKS_ERROR';
const FETCH_TASK_SUCCESS='FETCH_TASK_SUCCESS';

const SORT_TASKS ='SORT_TASKS';
const SORT_PARAM='SORT_PARAM';
const SORT_PARAM_PREVIOUS='SORT_PARAM_PREVIOUS';
const CHANGE_PAGE_NUMBER='CHANGE_PAGE_NUMBER';

const initialState={
	tasksFull: [],
	tasks: [], 
	loading: false,
	error: null,
	pageLength: 3,
	pagesQuantity: 1,
	pageNumber: 1,
	firstTask: 0,
	lastTask: 3,
	sortParam: " ",
	sortParamPrevious: " ",
	sortReverse: false
};

export default function  tasksReducer(state=initialState, action){
	switch(action.type){
		case 'FETCH_TASKS_START':
			return {
				...state,
				loading: true
			}
		case 'FETCH_TASKS_SUCCESS':
			return {
				...state,
				loading: false,
				tasksFull: action.tasks,
				tasks: action.tasks.slice(state.firstTask, state.lastTask),
				pagesQuantity: Math.ceil(action.tasks.length/state.pageLength)
			}
		case 'FETCH_TASK_SUCCESS':
			return {
				...state,
				loading: false,
				quiz: action.task
			}
		case 'FETCH_TASKS_ERROR':
			return {
				...state,
				loading: false,
				error: action.error
			}

		case 'SORT_TASKS':
				return{
					...state,
					tasks: action.newTasks
				}
		case 'SORT_PARAM':
			if(action.sortParam === state.sortParam){
				return{
					...state, 
					sortParam: action.sortParam,
					sortParamPrevious: action.sortParam,
					sortReverse: !state.sortReverse
				}
				} else {
				return{
					...state, 
					sortParam: action.sortParam,
					sortParamPrevious: action.sortParam,
					sortReverse: false
				}	
			}

		case 'SORT_PARAM_PREVIOUS':
				return{
					...state, 
					sortParamPrevious: action.sortParamPrevious
				}		
		case 'CHANGE_PAGE_NUMBER':
				return{
					...state,
					pageNumber: action.payload.pageNumber,
					firstTask: action.payload.firstTask,
					lastTask: action.payload.lastTask,
					tasks: state.tasksFull.slice(action.payload.firstTask, action.payload.lastTask)
				}		
		default:
		return state
	}						
}

export function resetPersonCreation(){
	 window.location.reload();
}
export function fetchTasks(){
	return async dispatch=>{
		dispatch(fetchTasksStart());
			try{
	  			const response = await axios.get('tasks.json'); 
	  			const tasks=[];
	  			Object.values(response.data).forEach((key, index)=>{
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
export function fetchTaskSuccess(task){
	return {type: FETCH_TASK_SUCCESS,
			task
		   }
}
export function fetchTasksError(error){
	return {type: FETCH_TASKS_ERROR,
			error
		   }
}
export function sortParamFunction(sortParam){
	return {type: SORT_PARAM,
			sortParam
		   }
}
export function sortParamPreviousFunction(sortParamPrevious){
	return {type: SORT_PARAM_PREVIOUS,
			sortParamPrevious
		   }
}
export const sortTasks=(sortParam)=>(dispatch, getState)=>{
	let newTasks;
	switch(sortParam){
		case "TaskText":
			dispatch(sortParamFunction(sortParam));
			break;
		case "Name":
			dispatch(sortParamFunction(sortParam));
			break;
		case "Status":
			dispatch(sortParamFunction(sortParam));
			break;
		default:
			dispatch({type: SORT_TASKS,
					newTasks
			});
	}		
}

export function changePageNumber(pageNumber){
	let firstTask=(pageNumber - 1)*3;
	let lastTask=pageNumber*3;
	let payload={pageNumber,
				 firstTask,
				 lastTask
				};
	return {type: CHANGE_PAGE_NUMBER,
			payload
	}
}


