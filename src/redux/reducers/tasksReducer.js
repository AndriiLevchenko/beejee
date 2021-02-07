
import axios from  './../../axios/axios-newTask';

const FETCH_TASKS_START='FETCH_TASKS_START';
const FETCH_TASKS_SUCCESS='FETCH_TASKS_SUCCESS';
const FETCH_TASKS_ERROR='FETCH_TASKS_ERROR';
const FETCH_TASK_SUCCESS='FETCH_TASK_SUCCESS';

const SORT_TASKS ='SORT_TASKS';
const SORT_PARAM='SORT_PARAM';

const initialState={
	tasks: [], 
	loading: false,
	error: null,
	pageLength: 3,
	pageNumber: 1,
	firstTask: 0,
	lastTask: 2,
	theRest: 0,
	sortParam: " "
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
				tasks: action.tasks
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
				return{
					...state, 
					sortParam: action.sortParam
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

export const sortTasks=(sortParam)=>(dispatch, getState)=>{
	let tasks = getState().tasksReducer.tasks;
	console.log("tasks = ", tasks);
	let newTasks;
	switch(sortParam){
		case "TaskText":
			newTasks = tasks.sort((a, b)=>{ if( a.taskText > b.taskText) {return -1} else { return 1}});
				alert("sort by parameter  " + sortParam);
			dispatch(sortParamFunction(sortParam));
			break;
		case "Name":
			newTasks = tasks.sort((a, b)=>{ if( a.name > b.name){ return -1} else{  return 1}});
				alert("sort by parameter  " + sortParam);
			dispatch(sortParamFunction(sortParam));
			break;
		case "Status":
			newTasks = tasks.sort((a, b)=>{ if( a.status > b.status) {return -1} else { return 1}});
				alert("sort by parameter  " + sortParam);
			dispatch(sortParamFunction(sortParam));
			break;
		default:
			dispatch({type: SORT_TASKS,
					newTasks
			});
	}		
}


