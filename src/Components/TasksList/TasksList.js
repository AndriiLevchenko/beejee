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
		const sortTasks=(sortParam)=>{
			props.sortTasks(sortParam);
		}
		const tasks=props.tasks;
		let tasksForMap = tasks;
		switch(props.sortParam){
			case "TaskText":
				tasksForMap.sort((a, b)=>{ if( a.taskText > b.taskText) {return -1} else { return 1}});
				break;
			case "Name":
				tasksForMap.sort((a, b)=>{ if( a.name > b.name){ return -1} else{  return 1}});
				break;
			case "Email":
				tasksForMap.sort((a, b)=>{ if( a.name > b.name){ return -1} else{  return 1}});
				break;
			case "Status":
				tasksForMap.sort((a, b)=>{ if( a.name > b.name){ return -1} else{  return 1}});
				break;
			default:
				tasksForMap = tasks
	
		}
		tasksForMap = props.sortReverse ? tasksForMap.reverse() : tasksForMap;
		const  	renderPersons=()=>{
	  		return tasksForMap && tasksForMap.map((task, index)=>{
	  			return(
  					<li
  						key={task.id} 
  					>
  						<NavLink to={'/tasks' + task.id }>
							<span className={classes.taskText}>{task.taskText}</span>  
							<span className={classes.performer}>{task.name}</span>  
							<span className={classes.email}>{task.email || functionEmail(task.name)}</span>   
							<span className={classes.status}>
								{task.status ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="disabled" />}
							</span>
  						</NavLink>	
  					</li>
	  			)  	
		  		
		  	})		
	  	}

	    return (
	      	<div className={classes.TaskPersonsList}>
		      	{props.sortParam}
	      		<div className={classes.Tests}>	
					<div className={classes.Header}>
						<button className={classes.taskText} onClick =  {()=>sortTasks("TaskText")}> Task     </button>  
						<button className={classes.performer} onClick = {()=>sortTasks("Name")}>         Performer</button>  
						<button className={classes.email} onClick =     {()=>sortTasks("Name")}>        E-mail   </button>   
						<button className={classes.status} onClick =    {()=>sortTasks("Status")}>     Status   </button>
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
		loading: state.tasksReducer.loading,
		sortParam: state.tasksReducer.sortParam,
		sortParamPrevious: state.tasksReducer.sortParamPrevious,
		sortReverse: state.tasksReducer.sortReverse
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchTasks: ()=>dispatch(fetchTasks()),
		sortTasks: (sortParam)=>dispatch(sortTasks(sortParam))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
