import React from 'react';
import classes from './RacePersonsList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchPersons} from './../../redux/reducers/personsReducer';

const RacePersonsList =(props)=> {
		
		const  	renderPersons=()=>{
	  		return props.persons.map(person=>{
		  		if(props.race.indexOf(person.race) === 0){
		  			return(
		  					<li
		  						key={person.id}
		  					>
		  						<NavLink to={'/person' + person.id }>
		  							{person.name}
		  						</NavLink>	
		  					</li>
		  			)  	
		  		}
		  	})		
	  	}

		console.log(props)
	    return (
	      	<div className={classes.RacePersonsList}>
	      		<div className={classes.Tests}>	
					{ props.loading && props.persons.length !== 0
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
		persons: state.personsReducer.persons,
		loading: state.personsReducer.loading
	}
}

function mapDispatchToProps(dispatch){
	return{
		fetchPersons: ()=>dispatch(fetchPersons())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RacePersonsList);
