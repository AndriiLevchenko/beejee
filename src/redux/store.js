

// import rootReducer from './rootReducer';


// let store={
// 	_state = {count: 0,
//     		rightAnswers: 0, 
//     		isOpenAuth: true,
//     		isOpenBeginning: true,
//     		isOpenEnding: false,
//     		isOpenFinish: false,
//     		answersArray: []
//     	}
// 	getState(){
// 			return  this._state;
// 	},
// 	_callSubscriber(){
// 		console.log('state изменен');
// 	},
// 	subscribe (observer){
// 		this._callSubscriber = observer;
// 	},

// 	changeStateHandler = (e) => {
//       	this.setState({count: this._state.count + 1});
//       	//alert(e.target.id);

//         if(e.target.id == this.props.answers[this._state.count].verity){
//         		const arr = this._state.answersArray;
//         		arr[arr.length]=this._state.count;
//         		this.setState({answersArray: arr});

//         	console.log(arr);
//       		this.setState({rightAnswers: this._state.rightAnswers + 1});}
//       	if(this.state.count == 24){
// 			this.setState({isOpenEnding:  !this._state.isOpenEnding});}
//         }
     
// 	hideAuth = () => {
// 		this.setState({isOpenAuth:  !this._state.isOpenAuth});
// 	}

// 	hideBeginning = () => {
// 		this.setState({isOpenBeginning:  !this._state.isOpenBeginning});
// 	}
// 	Finishing = () =>{
// 			this.setState({isOpenEnding:  !this._state.isOpenEnding,
// 			               isOpenFinish:  !this._state.isOpenFinish});
// 	}
// 	againBeginning = () => {
// 		this.setState({	count: 0,
//     					rightAnswers: 0, 
//     					isOpenBeginning: true,
//     					isOpenEnding: false,
//     					isOpenFinish: false,
//     					answersArray: []});
// 	}




// 	changeStateChilren(){
//     this.refs.children.setValue(this.state.answersArray)
// 	dispatch(action){

// 		this._state.profilePage = profileReducer(this._state.profilePage, action);	
// 		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);	
// 		this._state.sidebar = sidebarReducer(this._state.sidebar, action);																		

		
// 		this._callSubscriber(this._state);
		
// 	}
// }

// export default store;
// window.store = store;