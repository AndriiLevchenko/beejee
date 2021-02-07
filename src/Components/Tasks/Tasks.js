import React, {Component} from 'react';
import classes from './Tasks.module.css';
import Button from './../../UI/Button/Button';
import {validate, validateForm} from './../../form/formFramework';
import {connect} from 'react-redux';
import {openCreateTask} from './../../redux/reducers/createReducer';
import {fetchTasks} from './../../redux/reducers/tasksReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from './../TasksList/TasksList';
import CreateTask from "./../CreateTask/CreateTask";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

class Tasks extends Component{

	componentDidMount(){
	  		this.props.fetchTasks();
	}
	openCreateTask =(e)=>{
		this.props.openCreateTask(e.target.id);
	}
	changeHandler =(value, controlName)=>{
		const formControls={...this.state.formControls};
		const control={...formControls[controlName]};
		control.touched=true;
		control.value=value;
		control.valid=validate(control.value, control.validation);
		formControls[controlName]=control;
		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		});
	}

	render(){
		 	console.log( this.props);
		 	   	return (
      				<div>
						<div className="container">
								<div className={classes.Task}>
						<h1> Tasks  </h1>								
						<TasksList pageNumber={this.props.pageNumber} />
						</div>	
						<ExpandMoreIcon color="primary" style={{ fontSize: 100 }} />
						<ExpandLessIcon color="primary" style={{ fontSize: 100 }}  />
						<div style={{color:"white"}}>
						</div>
						<div className={classes.Task__Button}>					
							<Button value="Create new Task"  onClick={this.openCreateTask} />	
						</div>
						</div>
						{this.props.isCreateTaskOpen && <section><CreateTask  race={this.props.race} isCreateTaskOpen ={this.props.isCreateTaskOpen}  /></section>}
					</div>		
    			) 
	}
 }


function mapStateToProps(state){
	return{
		tasks: state.tasksReducer.tasks,
		isCreateTaskOpen: state.createReducer.isCreateTaskOpen,
		pageNumber: state.tasksReducer.pageNumber
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchTasks: ()=>dispatch(fetchTasks()),
		openCreateTask: (race)=>dispatch(openCreateTask(race))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
