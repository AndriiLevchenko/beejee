import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem =(props)=> {
		console.log(props.state);
		const cls=[classes.AnswerItem]

		if (props.state){
			cls.push(classes[props.state]);
		}
		
    return (
			//<li ><label type='button'  onClick={changeStateHandler}>{'answers[this.props.state.state.quizReducer.quiz.count].answer0'} </label></li>		
			<li className={cls.join(' ')} 
				onClick={()=>props.onAnswerClick(props.answer.id)}
			>
				{props.answer.text} 
			</li>
    )
  }



export default AnswerItem;
