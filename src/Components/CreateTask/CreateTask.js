import React, {Component} from 'react';
import classes from './CreateTask.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {connect} from 'react-redux';
import {createTask} from './../../redux/reducers/createReducer';
import {validateEmail} from './../../utils/validateEmail';

class CreateTask extends Component{
	state={
		formControls:{
			taskText:{
				value: '',
				type:'text',
				label: 'Task Text',
				errorMessage: "Enter task text",
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 5
				}
			},
			name:{
				value: '',
				type:'text',
				label: ' performer\'s Name',
				errorMessage: "Enter performer's name",
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 5
				}
			},
			email:{
				value: ' ',
				type:'email',
				label: 'performer\'s E-mail',
				errorMessage: "Enter perfomer's E-mail",
				valid: false,
				touched: false,
				validation:{
					required: true,
					email: true
				}
			}
		}
	}
	validateControl(value, validation){
		if(!validation){
			return true
		}
		let isValid=true;
		if(validation.required){
			isValid=value.trim() !=='' ? true : false;
		}
		if(validation.minLength){
			isValid=value.length >= validation.minLength ? true : false;
		}
		if(validation.email){
			isValid=validateEmail(value) ? true : false;
		}
		return isValid
	}
	onChangeHandler =(event, controlName)=>{
		const formControls={...this.state.formControls};
		const control={...formControls[controlName]};
		control.value=event.target.value;
		control.touched=true;
		control.valid=this.validateControl(control.value, control.validation);
		formControls[controlName]=control;
		let isFormValid=true;
		Object.keys(formControls).forEach(name=>{
			isFormValid=formControls[name].valid  ? true : false;
		});
		this.setState({
			formControls, 
			isFormValid
		});
	}
	renderInputs(){
		return Object.keys(this.state.formControls).map((controlName, index)=>{
			const control=this.state.formControls[controlName];
			return( <Input 
						key={controlName + ' ' + index}
						type={control.type}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						label={control.label}
						errorMessage={control.errorMessage}
						shouldValidate={!!control.validation}
						onChange={(event)=>this.onChangeHandler(event, controlName)}
				   />)
		})
	}
	submitHandler = (event)=>{
		const newTask={
			taskText: this.state.formControls.taskText.value,
			id: Date.now(),
			status: false,
			name: this.state.formControls.name.value,
			email: this.state.formControls.email.value
		}
		this.props.createTask(newTask);
	}

	render(){
    	return(		
			<div className={classes.TaskWide}>
				<div className={classes.Task}>
				 	<h4>Create new Task</h4>
					 	{this.renderInputs()}
					 	<div className={classes.Task__Button}>
					 		<Button 
					 			type='button' 
					 			disabled={!(this.state.formControls.taskText.valid && this.state.formControls.name.valid && this.state.formControls.email.valid)} 
					 			onClick={(event)=>this.submitHandler(event)}  
					 			value="CREATE NEW TASK" 
					 		/>						 	
						</div>
					
				</div>
		 	</div>
		)
	}
}


function mapStateToProps(state){
	return{
		tasks: state.tasksReducer.tasks,
		authenticated: state.authReducer.token
	}
}
function mapDispatchToProps(dispatch){
	return{
		createTask: newTask=>dispatch(createTask(newTask))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
