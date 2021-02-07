import React, {Component} from 'react';
import classes from './App.module.css';
import Layout from './Components/Layout/Layout';
import Auth from './Components/Auth/Auth';
import LogOut from './Components/Auth/LogOut';
import Tasks from './Components/Tasks/Tasks';
import EditTask from './Components/CreateTask/EditTask';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {autoLogin} from './redux/reducers/authReducer';


class App extends Component {
      componentDidMount(){
        this.props.autoLogin();
      }
      render(){
        let routes=(
            <Switch>
                <Route path='/tasks' component={Tasks} />
                <Route path='/auth' component={Auth} />
                <Route path='/tasks:id' component={EditTask} />
                <Route path='/' exact component={Tasks} />
                <Redirect to='/' />
            </Switch>
        );
        if(this.props.isAuthenticated){
            routes=(
            <Switch>
                <Route path='/tasks' component={Tasks} />
                <Route path='/tasks:id' component={EditTask} />
                
                <Route path='/' exact component={Tasks} />
                <Route path='/logout' component={LogOut} />
                <Redirect to='/' />
            </Switch>
        );
        }

        return (
          <div className={classes.App}>
            <header className={classes.Appheader}>
          	<Layout>
          	    {routes}
          	</Layout>
            </header>
          </div>
        )
      }
}

function mapStateToProps(state){
	return{
		isAuthenticated: !!state.authReducer.token
	}
}

function mapDispatchToProps(dispatch){
  return{
    autoLogin: ()=>dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
