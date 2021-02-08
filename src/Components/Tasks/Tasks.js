import React, {Component} from 'react';
import classes from './Tasks.module.css';
import Button from './../../UI/Button/Button';
import {connect} from 'react-redux';
import {openCreateTask} from './../../redux/reducers/createReducer';
import {fetchTasks, changePageNumber} from './../../redux/reducers/tasksReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from './../TasksList/TasksList';
import CreateTask from "./../CreateTask/CreateTask";
import Pagination from '@material-ui/lab/Pagination';

class Tasks extends Component{

	componentDidMount(){
	  	this.props.fetchTasks();
	}
	openCreateTask =(e)=>{
		this.props.openCreateTask(e.target.id);
	}
	handleChange =(event, value=3)=>{
		this.props.changePageNumber(value);
	}

	render(){
		 	   	return (
      				<div>
						<div className="container">
							<div className={classes.Task}>
								<h1> Tasks  </h1>	
								<h2>{"pageNumber = " + this.props.pageNumber + ", firstTask = " + this.props.firstTask + ",      lastTask = " + this.props.lastTask}</h2>							
								<TasksList />
							</div>	
							<div className={classes.pagination}>
								<Pagination count={this.props.pagesQuantity} page={this.props.pageNumber} color="primary" onChange={this.handleChange} />
							</div>
							<div className={classes.Task__Button}>					
								<Button value="Create new Task" disabled={!this.props.authenticated}  onClick={this.openCreateTask} />	
							</div>

						</div>
						{this.props.isCreateTaskOpen && <section><CreateTask  isCreateTaskOpen ={this.props.isCreateTaskOpen}  /></section>}
					</div>		
    			) 
	}
 }


function mapStateToProps(state){
	return{
		tasks: state.tasksReducer.tasks,
		isCreateTaskOpen: state.createReducer.isCreateTaskOpen,
		pageNumber: state.tasksReducer.pageNumber,
		pagesQuantity: state.tasksReducer.pagesQuantity,
		firstTask: state.tasksReducer.firstTask,
		lastTask: state.tasksReducer.lastTask,
		authenticated: state.authReducer.token
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchTasks: ()=>dispatch(fetchTasks()),
		openCreateTask: (task)=>dispatch(openCreateTask(task)),
		changePageNumber: (pageNumber)=>dispatch(changePageNumber(pageNumber))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
