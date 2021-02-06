import React, {Component} from 'react';
import classes from './Tasks.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {validate, validateForm} from './../../form/formFramework';
import Auxiliary from './../../hoc/Auxiliary';
import {connect} from 'react-redux';
import {openCreateTask} from './../../redux/reducers/createReducer';
import {fetchTasks} from './../../redux/reducers/tasksReducer';
import {pageUp, pageDown} from './../../redux/reducers/paginationReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from './../TasksList/TasksList';
import CreateTask from "./../CreateTask/CreateTask";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


class Tasks extends Component{

	componentDidMount(){
	  		this.props.fetchTasks();
	}
	
	// renderTasks(){
	  		
	  			
	//   			return(				
	// 					<div>
	// 					<div className={classes.Task}>
	// 						<h1> Tasks  </h1>								
	// 						<TasksList />
	// 					</div>	
	// 					<div className={classes.Person__Button}>					
	// 							<Button value="Create new Task"  onClick={this.openCreateTask} />	
	// 						</div>
	// 					</div> 
	//   			)
	  			
	  			
	// }

	openCreateTask =(e)=>{
		console.log(e.target.id);
		this.props.openCreateTask(e.target.id);
	}
	pageUp =()=>{
		this.props.pageUp();
	}
	pageDown =()=>{
		this.props.pageDown();
	}

	// submitHandler=(event)=>{
	// 	event.preventDefault();
	// }

	// createQuizHandler= event=>{
	// 	event.preventDefault();
	// 	console.log(this.state.quiz);
	
	// 		this.props.finishCreateQuiz();
	// }

	changeHandler =(value, controlName)=>{
		const formControls={...this.state.formControls};
		const control={...formControls[controlName]};
		control.touched=true;
		control.value=value;
		control.valid=validate(control.value, control.validation);
		console.log('valid = ', control.valid);
		formControls[controlName]=control;
		//console.log(formControls[controlName], validateForm(formControls));
		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		});
	}


	// renderControls(){
		
	// 	return Object.keys(this.state.formControls).map((controlName, index)=>{
	// 		const control=this.state.formControls[controlName];
	// 		console.log('control.valid = ', control.valid)
	// 		return( 
	// 			<Auxiliary key={controlName + index} >
	// 				<Input 
	// 					key={control.name + index}
	// 					label={control.label}
	// 					type={control.type}
	// 					value={control.value}
	// 					valid={control.valid}
	// 					shouldValidate={!!control.validation}
	// 					touched={control.touched}
	// 					errorMessage={control.errorMessage}
	// 					onChange={event=>this.changeHandler(event.target.value, controlName)}
	// 				/>
	// 				{index === 0 ? <hr/> : null }
	// 			</Auxiliary>
	// 		)
	// 	})
	// }
	

	render(){
		 	console.log( this.props);
		 
		 	   	return (
      				<div>
						
							<div className="container">
									<div className={classes.Task}>
							<h1> Tasks  </h1>								
							<TasksList pageNumber={this.props.pageNumber} />
						</div>	
						<ExpandMoreIcon color="primary" style={{ fontSize: 100 }} onClick={this.pageUp} />
						<ExpandLessIcon color="primary" style={{ fontSize: 100 }} onClick={this.pageDown} />
						<div style={{color:"white"}}>
					{"pageNumber " +  this.props.pageNumber + "/" + (Math.ceil(this.props.tasks.length/3)) }
						</div>
						<div className={classes.Person__Button}>					
								<Button value="Create new Task"  onClick={this.openCreateTask} />	
							</div>
							</div>
					
						
						
						{this.props.isCreateTaskOpen && <section><CreateTask  race={this.props.race} isCreatePersonOpen ={this.props.isCreatePersonOpen}  /></section>}
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
		//createQuizQuestion: item=>dispatch(createQuizQuestion(item)),
		fetchTasks: ()=>dispatch(fetchTasks()),
		openCreateTask: (race)=>dispatch(openCreateTask(race)),
		pageUp: ()=>dispatch(pageUp()),
		pageDown: ()=>dispatch(pageDown())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
