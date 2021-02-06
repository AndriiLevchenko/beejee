
import axios from  './../../axios/axios-newTask';

const CREATE_PERSON='CREATE_PERSON';
const RESET_PERSON_CREATION='RESET_PERSON_CREATION';
const OPEN_CREATE_TASK="OPEN_CREATE_TASK";

const initialState={
	isCreateTaskOpen: false,
	newPerson: {},
	task: " ",
	nameForEdit: " "
};

export default function  createReducer(state=initialState, action){
	switch(action.type){
		case OPEN_CREATE_TASK:
			return{
				...state,
				isCreateTaskOpen: true,
				task: action.task
			}
		case  CREATE_PERSON:
			return {
				...state,
				newPerson: [...state.newPerson, action.newPerson]
			}
		case RESET_PERSON_CREATION:
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
	console.log(task);
	return{
		type: OPEN_CREATE_TASK, 
		task
	}
}

export function resetPersonCreation(){
	window.location.reload()
}

export function createTask(newPerson){
	return  (dispatch)=>{
		axios.post("https://abzagencytest.firebaseio.com/tasks.json", newPerson).then(response=>{
			console.log("post response = ", response);
			dispatch(resetPersonCreation());
			alert("New Task " + newPerson.name + " was created");
			dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
		
	}		
}
export function editTask(editedPerson){
	const idPerson=editedPerson.id;
	console.log(editedPerson, idPerson);
	return  (dispatch)=>{
		axios.put("https://abzagencytest.firebaseio.com/tasks/" + idPerson + ".json", editedPerson).then(response=>{
			console.log("post response = ", response);
			dispatch(resetPersonCreation());
			alert("New Task " + editedPerson.name + " was edited");
			dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
	}		
}
// export function statusToggle(editedPerson){
// 	const idPerson=editedPerson;
// 	console.log(editedPerson, idPerson);
// 	return  (dispatch)=>{
// 		axios.put("https://abzagencytest.firebaseio.com/tasks/" + idPerson + ".json", editedPerson).then(response=>{
// 			console.log("post response = ", response);
// 			alert("New Task " + editedPerson.name + " was edited");
// 			dispatch(resetPersonCreation());
// 		}).catch(error=>console.log("error = ", error));
// 	}		
// }


export function deleteTask(deletedPersonId){
	return  (dispatch)=>{
		axios.delete("https://abzagencytest.firebaseio.com/tasks/" + deletedPersonId +  ".json").then(response=>{
			console.log("post response = ", response);
			alert("New Task  was deleted");
			dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
		
	}		
}




