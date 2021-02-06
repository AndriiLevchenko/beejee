import React from 'react';
import classes from './TasksList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchTasks} from './../../redux/reducers/tasksReducer';
import {functionEmail} from './../../utils/functionEmail';
//import {statusToggle} from './../../redux/reducers/createReducer';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const RacePersonsList =(props)=> {
	console.log("props =", props);
		const statusToggle=(event)=>{
			event.stopPropagation();
			console.log("change status", event.target.id);
			props.statusToggle(event.target.id);
		}
		const  	renderPersons=()=>{
	  		return props.tasks.map(task=>{
		  		console.log("task = ", task);
		  			return(
		  					<li
		  						key={task.id}
		  					>
		  						<NavLink to={'/tasks' + task.id }>
 									<span className={classes.taskText}>{task.taskText}</span>  
 									<span className={classes.performer}>{task.name}</span>  
 									<span className={classes.email}>{functionEmail(task.name)}</span>   
 									<span className={classes.status}>
 										{task.status ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="disabled" />}
 									</span>
		  						</NavLink>	
		  					</li>
		  			)  	
		  		
		  	})		
	  	}

		console.log(props)
	    return (
	      	<div className={classes.RacePersonsList}>
	      		<div className={classes.Tests}>	
					{ props.loading && props.tasks.length !== 0
						? <Loader />
						:	<ul>
								{renderPersons()}
							</ul>
					}
				</div>
	      	</div>
	    )
	
}

function mapStateToProps(state){
	return{
		tasks: state.tasksReducer.tasks,
		loading: state.tasksReducer.loading
	}
}

function mapDispatchToProps(dispatch){
	return{
		fetchTasks: ()=>dispatch(fetchTasks())
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RacePersonsList);
