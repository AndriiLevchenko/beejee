import React, {Component} from 'react';
import classes from './CreatePerson.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {connect} from 'react-redux';
import {createPerson} from './../../redux/reducers/createReducer';

class CreatePerson extends Component{
	state={
		nameForEdit: " ",
		race: " "
	}

	submitHandler=(event)=>{
		event.preventDefault();
	}

	changeHandler =(value)=>{
		this.setState({
			nameForEdit: value,
		});
		console.log(this.state.nameForEdit);
	}

	createPerson = (event)=>{
		const newPerson={
			name: this.state.nameForEdit,
			id: this.props.persons.length + 1,
			race: this.props.race
		}
		console.log("newPerson = ", newPerson, event);
		this.props.createPerson(newPerson);
		this.setState({
			nameForEdit: " ",
			race: " "
		});
	}

	render(){
		 	console.log( this.props);
	    	return(		
				<div className={classes.PersonWide}>
					<div className={classes.Person}>
					 	<h4>Create new Person</h4>						 
					 	<Input 		label="Enter Person's Name" 
					 				value={this.state.nameForEdit}
					 				onChange={event=>this.changeHandler(event.target.value)}
					 	/>
					 	<div className={classes.Person__Button}>
					 		<Button type='button' onClick={(event)=>this.createPerson(event)} value="CREATE NEW PERSON" />						 	
						</div>
					</div>
			 	</div>
			)
	}
}


function mapStateToProps(state){
	return{
		persons: state.personsReducer.persons
	}
}

function mapDispatchToProps(dispatch){
	return{
		createPerson: newPerson=>dispatch(createPerson(newPerson))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePerson);
