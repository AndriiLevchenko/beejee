import React from 'react';
import classes from './TasksList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchTasks, sortTasks} from './../../redux/reducers/tasksReducer';
import {functionEmail} from './../../utils/functionEmail';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const TasksList =(props)=> {
	console.log("props =", props);
		const sortTasks=(sortParam)=>{
			props.sortTasks(sortParam);
		}
		const tasksForMap=props.tasks;
		const  	renderPersons=()=>{
	  		return tasksForMap && tasksForMap.map((task, index)=>{
		  			return(
		  					<li
		  						key={task.id} idOrder={index}
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
	      	<div className={classes.TaskPersonsList}>
	      		<div className={classes.Tests}>	
	      						<div className={classes.Header}>
	      							<span className={classes.taskText} onClick =  {()=>sortTasks("TaskText")}> Task     </span>  
 									<span className={classes.performer} onClick = {()=>sortTasks("Name")}>         Performer</span>  
 									<span className={classes.email} onClick =     {()=>sortTasks("Name")}>        E-mail   </span>   
 									<span className={classes.status} onClick =    {()=>sortTasks("Status")}>     Status   </span>
 								</div>
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
		fetchTasks: ()=>dispatch(fetchTasks()),
		sortTasks: (sortParam)=>dispatch(sortTasks(sortParam))
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
