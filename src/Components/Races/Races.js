import React, {Component} from 'react';
import classes from './Races.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import {validate, validateForm} from './../../form/formFramework';
import Auxiliary from './../../hoc/Auxiliary';
import {connect} from 'react-redux';
import {openCreatePerson} from './../../redux/reducers/createReducer';
import {fetchPersons} from './../../redux/reducers/personsReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import RacePersonsList from './../RacePersonsList/RacePersonsList';
import CreatePerson from "./../CreatePerson/CreatePerson";



class Races extends Component{

	componentDidMount(){
	  		this.props.fetchPersons();
	}
	
	renderRaces(){
	  		return this.props.races.map((race, index)=>{
	  			return(				
						<div className="col-md-3">
						<div className={classes.Race}>
							<h1> Race {race}  </h1>								
							<RacePersonsList race={race} key={index}/>
						</div>	
						<div className={classes.Person__Button}>					
								<Button value="Create new Person" id={race} onClick={this.openCreatePerson} />	
							</div>
						</div> 
	  			)
	  		})		
	}

	openCreatePerson =(e)=>{
		console.log(e.target.id);
		this.props.openCreatePerson(e.target.id);
	}

	submitHandler=(event)=>{
		event.preventDefault();
	}

	createQuizHandler= event=>{
		event.preventDefault();
		console.log(this.state.quiz);
	
			this.props.finishCreateQuiz();
	}

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


	renderControls(){
		
		return Object.keys(this.state.formControls).map((controlName, index)=>{
			const control=this.state.formControls[controlName];
			console.log('control.valid = ', control.valid)
			return( 
				<Auxiliary key={controlName + index} >
					<Input 
						key={control.name + index}
						label={control.label}
						type={control.type}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event=>this.changeHandler(event.target.value, controlName)}
					/>
					{index === 0 ? <hr/> : null }
				</Auxiliary>
			)
		})
	}
	selectChangeHandler =(event)=>{
		this.setState({
			rightAnswerId: +event.target.value
		});
	}

	render(){
		 	console.log( this.props);
		 
		 	   	return (
      				<div className={classes.Races}>
						<div className="icon-info">
							<div className="container">
								<div className="row">
									{this.renderRaces()}
								
	  								<div className="clearfix"> </div>
								</div>  
							</div>
						</div> 		
						
						
						{this.props.isCreatePersonOpen && <section><CreatePerson  race={this.props.race} isCreatePersonOpen ={this.props.isCreatePersonOpen}  /></section>}
					</div>		
    			) 
	}
 }


function mapStateToProps(state){
	return{
		races: state.personsReducer.races,
		isCreatePersonOpen: state.createReducer.isCreatePersonOpen,
		race: state.createReducer.race
	}
}
function mapDispatchToProps(dispatch){
	return{
		//createQuizQuestion: item=>dispatch(createQuizQuestion(item)),
		fetchPersons: ()=>dispatch(fetchPersons()),
		openCreatePerson: (race)=>dispatch(openCreatePerson(race))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Races);
