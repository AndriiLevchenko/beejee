import React from 'react';
import classes from './AnswersList.module.css';
//import Button from './../../Button/Button';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList =(props)=> (
	
	

				<ul className={classes.AnswersList} >
					{props.answers.map((answer, index)=>{
							console.log(props.state);
						return(
							<AnswerItem answer={answer} 
										key={index} 
										onAnswerClick={props.onAnswerClick}
										state={props.state ? props.state[answer.id] : null}
							/>
						)
					})}
				</ul>
		
    
  )



export default AnswersList;
