import React, {Component} from 'react';
import classes from './CreateTask.module.css';
import fp from 'lodash/fp'
import {withRouter} from 'react-router-dom';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {connect} from 'react-redux';
import {editTask, deleteTask} from './../../redux/reducers/createReducer';

class EditTask extends Component{
	state={
		id: " ",
		taskTextForEdit: " ",
		edited: false,
		status: " ",
		idTask: " "
	}

	componentDidMount(){
		const tasksForFindIndex=this.props.tasks;
		const indexTask=tasksForFindIndex.findIndex(x => x.id === this.props.match.params.id);
		if(indexTask === -1){return};
		const taskTextForEdit = (this.props.tasks[indexTask].taskText);
		this.setState({
			id: this.props.match.params.id,
			taskTextForEdit,
			status: this.props.tasks[indexTask].status,
			name: this.props.tasks[indexTask].name
		})
	}
	changeHandler =(value)=>{
		this.setState({
			taskTextForEdit: value,
			edited: true
		});
	}
	editTask = (event)=>{
		const editedTask={
			taskText: this.state.taskTextForEdit,
			id: this.state.id,
			status: this.state.status,
			name: this.state.name,
			idTask: this.state.idTask
		}
		if (localStorage.getItem('token') || !this.state.edited){
			this.props.editTask(editedTask);	
		} else{
			alert("To edit Task you need to authorize!");
			this.props.history.push('/');
		}	
	}
	deleteTask = (event)=>{
		const deletedTaskId= this.state.id;
		this.props.deleteTask(deletedTaskId);
	}
	statusToggle =()=>{
		this.setState({
			status: !this.state.status
		});	
	}

	render(){
	    	return(			
					<div className={classes.TaskWide}>
						<div className={classes.Task}>
						 	<h4>Edit Task</h4>	
						 	{!this.props.authenticated && <h2>To edit task you need to authorize !</h2>	}
						 	<Input 		
				 				type="text"
				 				label="Edit Task " 
				 				value={this.state.taskTextForEdit}
				 				onChange={event=>this.changeHandler(event.target.value)}
				 				disabled={!this.props.authenticated}
						 	/>
						 	<input type='checkbox' checked={this.state.status}  onChange={()=>this.statusToggle()}/>
						 	{this.state.status ? "The task is completed. " : "Complete task"}
						 	<div className={classes.Task__Button}>
						 		<Button type='button' onClick={(event)=>this.editTask(event)} value="SAVE CHANGED TASK" />
						 	</div>	
						 	<div className={classes.Task__Button}>
						 		<Button type='button' disabled={!this.props.authenticated} onClick={(event)=>this.deleteTask(event)} value="DELETE TASK" />	
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

export default fp.flow(
  withRouter, connect(mapStateToProps, mapDispatchToProps))(EditTask);
