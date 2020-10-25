
import axios from  './../../axios/axios-newPerson';

const CREATE_PERSON='CREATE_PERSON';
const RESET_PERSON_CREATION='RESET_PERSON_CREATION';
const OPEN_CREATE_PERSON="OPEN_CREATE_PERSON";

const initialState={
	isCreatePersonOpen: false,
	newPerson: {},
	race: " ",
	nameForEdit: " "
};

export default function  createReducer(state=initialState, action){
	switch(action.type){
		case OPEN_CREATE_PERSON:
			return{
				...state,
				isCreatePersonOpen: true,
				race: action.race
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
				isCreatePersonOpen: false
			}
		
		default:
		return state
	}
}
export function openCreatePerson(race){
	console.log(race);
	return{
		type: OPEN_CREATE_PERSON, 
		race
	}
}

export function resetPersonCreation(){
	return{
		type: RESET_PERSON_CREATION
	}
}

export function createPerson(newPerson){
	return  (dispatch)=>{
		axios.post("https://abzagencytest.firebaseio.com/persons.json", newPerson).then(response=>{
			console.log("post response = ", response);
			dispatch(resetPersonCreation());
			alert("New Person " + newPerson.name + " was created");
			dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
		
	}		
}
export function editPerson(editedPerson){
	const idPerson=editedPerson.idPerson;
	console.log(editedPerson, idPerson);
	return  (dispatch)=>{
		axios.put("https://abzagencytest.firebaseio.com/persons/" + idPerson + ".json", editedPerson).then(response=>{
			console.log("post response = ", response);
			dispatch(resetPersonCreation());
			alert("New Person " + editedPerson.name + " was edited");
			dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
	}		
}


export function deletePerson(deletedPersonId){
	return  (dispatch)=>{
		axios.delete("https://abzagencytest.firebaseio.com/persons/" + deletedPersonId +  ".json").then(response=>{
			console.log("post response = ", response);
			alert("New Person  was deleted");
		}).catch(error=>console.log("error = ", error));
		
	}		
}




