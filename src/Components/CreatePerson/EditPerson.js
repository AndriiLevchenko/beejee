import React, {Component} from 'react';
import classes from './CreatePerson.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {connect} from 'react-redux';
import {editPerson, deletePerson} from './../../redux/reducers/createReducer';

class EditPerson extends Component{
	state={
		id: " ",
		nameForEdit: " ",
		raceForEdit: " ",
		idPerson: " "
	}

	componentDidMount(){
		const indexPerson=this.props.persons.findIndex(x => x.id == this.props.match.params.id)
		const nameForEdit = (this.props.persons[indexPerson].name);
		const raceForEdit = (this.props.persons[indexPerson].race);
		const idPerson = (this.props.persons[indexPerson].idPerson);
		console.log(this.props.persons);
		//const personForEdit=
		this.setState({
			id: this.props.match.params.id,
			nameForEdit,
			raceForEdit,
			idPerson
		})
	}
	
	changeHandler =(value)=>{
		this.setState({
			nameForEdit: value,
		});
		console.log(this.state.nameForEdit);
	}

	editPerson = (event)=>{
		const editedPerson={
			name: this.state.nameForEdit,
			id: this.state.id,
			race: this.state.raceForEdit,
			idPerson: this.state.idPerson
		}
		console.log("editedPerson = ", editedPerson, event);
		this.props.editPerson(editedPerson);
		this.setState({
			nameForEdit: " ",
			raceForEdit: " ",
			idPerson: " "
		});
	}
	deletePerson = (event)=>{
		const deletedPersonId= this.state.idPerson;
		console.log(deletedPersonId)
		this.props.deletePerson(deletedPersonId);
	}

	render(){
		 	console.log( this.props);
	    	return(			
					<div className={classes.PersonWide}>
						<div className={classes.Person}>
						 	<h4>Edit Person</h4>	
						 	<span> 		id =    {this.state.id}   </span>		 
						 	<Input 		label="Edit Person's Name" 
						 				value={this.state.nameForEdit}
						 				onChange={event=>this.changeHandler(event.target.value)}
						 	/>
						 	<div className={classes.Person__Button}>
						 		<Button type='button' onClick={(event)=>this.editPerson(event)} value="SAVE CHANGED PERSON" />
						 	</div>	
						 	<div className={classes.Person__Button}>
						 		<Button type='button' onClick={()=>this.deletePerson()} value="DELETE PERSON" />	
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
		editPerson: editedPerson=>dispatch(editPerson(editedPerson)),
		deletePerson: (deletedPerson)=>dispatch(deletePerson(deletedPerson))
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
