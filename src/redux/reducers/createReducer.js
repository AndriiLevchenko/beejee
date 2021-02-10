
import axios from  './../../axios/axios-newTask';

const OPEN_CREATE_TASK="OPEN_CREATE_TASK";
const ERROR='ERROR';

const initialState={
	isCreateTaskOpen: false,
	newPerson: {},
	task: " ",
	nameForEdit: " "
};

export default function  createReducer(state=initialState, action){
	switch(action.type){
		case 'ERROR':
			return{
				...state
			}
		case 'OPEN_CREATE_TASK':
			return{
				...state,
				isCreateTaskOpen: true,
				task: action.task
			}
		case  'CREATE_PERSON':
			return {
				...state,
				newPerson: [...state.newPerson, action.newPerson]
			}
		case 'RESET_PERSON_CREATION':
			return {
				...state,
				newPerson: {},
				isCreateTaskOpen: false
			}
		
		default:
		return state
	}
}
export function openCreateTask(task){
	return{
		type: OPEN_CREATE_TASK, 
		task
	}				
}

export function resetPersonCreation(){
	 window.location.reload();
}
export function resetPersonEditing(){
	 window.history.back();
}

export function createTask(newPerson){
	return  (dispatch)=>{
		axios.post("https://abzagencytest.firebaseio.com/tasks.json", newPerson).then(response=>{
			alert("New Task  was created");
			dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
		
	}		
}
export function editTask(editedPerson){
	const idPerson=editedPerson.id;
	return  (dispatch)=>{
		axios.put("https://abzagencytest.firebaseio.com/tasks/" + idPerson + ".json", editedPerson).then(response=>{
			alert("This Task  was changed");
			dispatch(resetPersonEditing());
		}).catch(error=>dispatch({type: ERROR}));
	}		
}

export function deleteTask(deletedPersonId){
	return  (dispatch)=>{
		axios.delete("https://abzagencytest.firebaseio.com/tasks/" + deletedPersonId +  ".json").then(response=>{
			alert("This Task  was deleted");
			dispatch(resetPersonEditing());
		}).catch(error=>dispatch({type: ERROR}));
		
	}		
}




