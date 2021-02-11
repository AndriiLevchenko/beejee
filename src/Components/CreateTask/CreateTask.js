import React, {Component} from 'react';
import classes from './CreateTask.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {connect} from 'react-redux';
import {createTask} from './../../redux/reducers/createReducer';
import Select from './../../UI/Select/Select';

class CreateTask extends Component{
	state={
		taskText: " ",
		Performer: "Aslan"
	}
	changeHandler =(value)=>{		
		this.setState({
			taskText: value,
		});
	}
	selectChangeHandler =(event)=>{
		this.setState({
			Performer: event.target.value
		});
	}
	createTask = (event)=>{
		const newTask={
			taskText: this.state.taskText,
			id: Date.now(),
			status: false,
			name: this.state.Performer
		}
		this.props.createTask(newTask);
		this.setState({
			taskText: " ",
			Performer: " "
		});
	}

	render(){
	    	return(		
				<div className={classes.TaskWide}>
					<div className={classes.Task}>
					 	<h4>Create new Task</h4>						 
					 	<Input 		label="Task" 
					 				value={this.state.taskText}
					 				onChange={event=>this.changeHandler(event.target.value)}
					 	/>
					 	<Select 
							label='Performer'
							value={this.state.Performer}
							onChange={this.selectChangeHandler}
							options={[
								{text: "Aslan", value: "Aslan"},
								{text: "Ibragim", value: "Ibragim"},
								{text: "Salman", value: "Salman"},
								{text: "Zelimkhan", value: "Zelimkhan"},
								{text: "Movsar", value: "Movsar"},
								{text: "newPerformer", value: "newPerformer"}
							]}
						/>
					 	
					 	<div className={classes.Task__Button}>
					 		<Button type='button' onClick={(event)=>this.createTask(event)}   value="CREATE NEW TASK" />						 	
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
