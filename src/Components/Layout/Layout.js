import React, {Component} from 'react';
import classes from './Layout.module.css';
import MenuToggle from './../Navigation/MenuToggle/MenuToggle';
import Drawer from './../Navigation/Drawer/Drawer';
import {connect} from 'react-redux';

class Layout extends Component {
  state = {
  	menu: false
  }	
  toggleMenuHandler =()=>{
  	this.setState({
  		menu: !this.state.menu
  	})
  }
  menuCloseHandler =()=>{
      this.setState({
        menu: false
      });
  }
  render(){
    console.log(this.props.children);
    return (
      <div className={classes.Layout}>
      	<Drawer 
      		isMenuOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
      	/>
      	<MenuToggle 
      		onToggle={this.toggleMenuHandler}
      		isMenuOpen={this.state.menu}
      	/>
        <main >
          {this.props.children}
     
        </main>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.authReducer.token
  }
}

export default connect(mapStateToProps)(Layout);
