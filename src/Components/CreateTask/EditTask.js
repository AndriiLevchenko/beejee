import React, {Component} from 'react';
import classes from './CreateTask.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {connect} from 'react-redux';
import {editTask, deleteTask} from './../../redux/reducers/createReducer';

class EditTask extends Component{
	state={
		id: " ",
		taskTextForEdit: " ",
		raceForEdit: " ",
		status: " ",
		idPerson: " "
	}

	componentDidMount(){
		const indexPerson=this.props.tasks.findIndex(x => x.id == this.props.match.params.id);
		console.log("indexPerson = ", indexPerson);
		const taskTextForEdit = (this.props.tasks[indexPerson].taskText);
		console.log("taskTextForEdit = ", taskTextForEdit);
		// const raceForEdit = (this.props.tasks[indexPerson].race);
		// console.log("raceForEdit = ", raceForEdit);
		const id = (this.props.tasks[indexPerson].id);
		console.log(this.props.tasks);
		console.log("id = ", id, this.state.idPerson);
		//const personForEdit=
		this.setState({
			id: this.props.match.params.id,
			taskTextForEdit,
			status: this.props.tasks[indexPerson].status,
			name: this.props.tasks[indexPerson].name
			//raceForEdit,
			
		})
	}
	
	changeHandler =(value)=>{
		this.setState({
			taskTextForEdit: value,
		});
		console.log(this.state.taskTextForEdit);
	}

	editTask = (event)=>{
		const editedTask={
			taskText: this.state.taskTextForEdit,
			id: this.state.id,
			status: this.state.status,
			name: this.state.name,
			idPerson: this.state.idPerson
		}
		console.log("editedTask = ", editedTask);
		this.props.editTask(editedTask);
		this.setState({
			taskTextForEdit: " ",
			status: " ",
			name: " ",
			id: " "
		});		
	}
	deleteTask = (event)=>{
		
		const deletedTaskId= this.state.id;
		console.log(deletedTaskId)
		this.props.deleteTask(deletedTaskId);
	}
	statusToggle =()=>{
		this.setState({
			status: !this.state.status
		});	
	}

	render(){
		 	console.log( this.props);
		 	console.log("this.state = ", this.state);
	    	return(			
					<div className={classes.PersonWide}>
						<div className={classes.Person}>
						 	<h4>Edit Person</h4>	
						 	<span> 		id =    {this.state.id}   </span>	

						 	<Input 		
						 				type="text"
						 				label="Edit Task " 
						 				value={this.state.taskTextForEdit}
						 				onChange={event=>this.changeHandler(event.target.value)}
						 				disabled={this.props.authenticated}
						 	/>
						 	<input type='checkbox' checked={this.state.status}  onChange={()=>this.statusToggle()}/>
						 	{this.state.status ? "The task is completed. " : "Complete task"}
						 	<div className={classes.Person__Button}>
						 		<Button type='button' onClick={(event)=>this.editTask(event)} value="SAVE CHANGED TASK" />
						 	</div>	
						 	<div className={classes.Person__Button}>
						 		<Button type='button' disabled={this.props.authenticated} onClick={(event)=>this.deleteTask(event)} value="DELETE TASK" />	
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
		editTask: editedTask=>dispatch(editTask(editedTask)),
		deleteTask: (deletedTask)=>dispatch(deleteTask(deletedTask))
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
