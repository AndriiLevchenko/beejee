
import axios from  './../../axios/axios-newPerson';

const FETCH_PERSONS_START='FETCH_PERSONS_START';
const FETCH_PERSONS_SUCCESS='FETCH_PERSONS_SUCCESS';
const FETCH_PERSONS_ERROR='FETCH_PERSONS_ERROR';
const FETCH_PERSON_SUCCESS='FETCH_PERSON_SUCCESS';

const initialState={
	persons: [], 
	loading: false,
	error: null,
	races: ["Hobbits", "Humans", "Dworfs", "Elfs"],
	isFinished: false
};

export default function  personsReducer(state=initialState, action){
	switch(action.type){
		case FETCH_PERSONS_START:
			return {
				...state,
				loading: true
			}
		case FETCH_PERSONS_SUCCESS:
			return {
				...state,
				loading: false,
				persons: action.persons
			}
		case FETCH_PERSON_SUCCESS:
			return {
				...state,
				loading: false,
				quiz: action.quiz
			}
		case FETCH_PERSONS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		
		default:
		return state
	}
}

export function fetchPersons(){
	return async dispatch=>{
		dispatch(fetchPersonsStart());
			try{
	  			const response = await axios.get('persons.json'); 
	  			console.log(response);
	  			const persons=[];

	  			Object.values(response.data).forEach((key, index)=>{
	  				console.log(Object.keys(response.data)[index]);
	  				persons.push({
	  					id: key.id,
	  					name: key.name,
	  					race: key.race,
	  					idPerson: Object.keys(response.data)[index]
	  				})
	  			});
	  		
	  	dispatch(fetchPersonsSuccess(persons));
	  		} catch(error) {
	  			dispatch(fetchPersonsError(error));
	  		}
	}
}
export function fetchPersonById(personId){
	console.log(personId);
	return async dispatch=>{
		dispatch(fetchPersonsStart());
			try{
	  			const response = await axios.get(`quizes/${personId}.json`); 
	  			const person=response.data;
	  			console.log(response.data);
	  			
	  	dispatch(fetchPersonSuccess(person));
	  		} catch(error) {
	  			dispatch(fetchPersonsError(error));
	  		}
	}
}

export function fetchPersonsStart(){
	return {type: FETCH_PERSONS_START}
}
export function fetchPersonsSuccess(persons){
	return {type: FETCH_PERSONS_SUCCESS,
			persons
		   }
}
export function fetchPersonSuccess(quiz){
	console.log(quiz);
	return {type: FETCH_PERSON_SUCCESS,
			quiz
		   }
}
export function fetchPersonsError(error){
	return {type: FETCH_PERSONS_ERROR,
			error
		   }
}
