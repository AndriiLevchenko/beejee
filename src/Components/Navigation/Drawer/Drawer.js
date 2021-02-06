import React, {Component} from 'react';
import classes from './Drawer.module.css';
import Backdrop from './../../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

 
class Drawer extends Component {

		    clickHandler =()=>{
          this.props.onClose();
        }
      renderLinks(llinks){
        return llinks.map((link, index)=>{
          return (
            <li key={index} >
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={this.clickHandler}
                >
                    {link.label}
                </NavLink>
            </li>
          )
          })
        }
    render(){
       const llinks=[
       // {to:'/', label:'Список', exact:true}
      ];
      if(this.props.isAuthenticated){
          llinks.push( {to:'/tasks', label:'Tasks', exact:false});
          llinks.push( {to:'/logout', label:'Exit', exact:false});
      } else {
          llinks.push({to:'/auth', label:'Авторизація', exact:false});
      }
        const cls=[classes.Drawer];
        if(!this.props.isMenuOpen){
          cls.push(classes.close);
        }
        return (
          <React.Fragment>
            <nav className={cls.join(' ')}>
              <ul>
                {this.renderLinks(llinks)}
              </ul>
            </nav>
            {this.props.isMenuOpen ? <Backdrop onClick={this.props.onClose} />  : null }
          </React.Fragment>
        )
  }
}


export default Drawer;
