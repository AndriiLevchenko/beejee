//quizReducer.js    =    quiz.js
import axios from  'axios';

const AUTH_SUCCESS='AUTH_SUCCESS';
const AUTO_LOG_OUT='AUTO_LOG_OUT';
const AUTH_LOG_OUT='AUTH_LOG_OUT';

const initialState={
	token: null
};

export default function  authReducer(state=initialState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return{
				...state,
				token: action.token
			}
		case AUTH_LOG_OUT:
			return{
				...state,
				token: null
			}
		default:
		return state
	}
}
export function authSuccess(token){
	return{
		type: AUTH_SUCCESS,
		token
	}
}
export function autoLogOut(time){
	return dispatch=>{
		setTimeout(()=>{
			dispatch(logOut());
		}, time*1000);
	}
}
export function logOut(){
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expirationDate');
	return{
		type: AUTH_LOG_OUT
	}
}
export function autoLogin(){
	return dispatch=>{
		const token=localStorage.getItem('token');
		if(!token){
			dispatch(logOut());
		} else {
			const expirationDate=new Date(localStorage.getItem('expirationDate'));
			if(expirationDate<= new Date()){
				dispatch(logOut);
			} else {
				dispatch(authSuccess(token));
				dispatch(autoLogOut((expirationDate.getTime()-new Date().getTime())/1000));
			}

		}
	}
}
export function auth(login, password, isLogin){
	if(!isLogin){
		alert("Login is incorrect");
	}
	return async dispatch=>{
			const email=login + "@" + login + ".ua";
			const authData={
				email,
				password,
				returnSecureToken: true
			}
		let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRj1R0UEHzbzdDaOOQIhjqWUvDsus*';
		if(isLogin){url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKs6rq7O9TkZTZ2Fvw_UIHZ8R0AA2VCxM'}
		const response = await axios.post(url, authData);
		const data=response.data;
		console.log(data);



		if(data.registered){
			const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
			alert("Authentication succeded");
			localStorage.setItem('token', data.idToken);
			localStorage.setItem('userId', data.localId);
			localStorage.setItem('expirationDate', expirationDate);

			dispatch(authSuccess(data.idToken));
			dispatch(autoLogOut(data.expiresIn));
		} else {
			alert("Authentication failed");
		}
	}
}
