//import {loginUser, logoutUser} from './redux/authReducer';

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { logOut}  from './../../redux/reducers/authReducer';


  class LogOut extends Component {
      componentDidMount(){
          this.props.logOut();
      }
      render(){
        return <Redirect to={'/'}  />
      }
  }
  

  function mapDispatchToProps(dispatch){
    return{
      logOut: ()=>dispatch(logOut())
    }
  }

  export default connect(null, mapDispatchToProps)(LogOut);