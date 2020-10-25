import React from 'react';
import styles from './Button.module.css';


const Button =  props => {
        return(
            <React.Fragment >     
                <button
                    id={props.id}
                    disabled={props.disabled}
                    onClick={props.onClick}
                    className={styles.className}
                > 
                    {props.value}
                </button>
              
              
            </React.Fragment>
        ) 
}
export default Button;

