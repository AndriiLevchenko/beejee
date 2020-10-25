import React, {Component} from 'react';
import classes from './App.module.css';
import Layout from './Components/Layout/Layout';
import Auth from './Components/Auth/Auth';
import LogOut from './Components/Auth/LogOut';
import Races from './Components/Races/Races';
import EditPerson from './Components/CreatePerson/EditPerson';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {autoLogin} from './redux/reducers/authReducer';
import {fetchPersons} from './redux/reducers/personsReducer';


class App extends Component {
      componentDidMount(){
        this.props.autoLogin();
      }
      render(){
        let routes=(
            <Switch>
                <Route path='/auth' component={Auth} />
               
                <Route path='/' exact component={Auth} />
                <Redirect to='/' />
            </Switch>
        );
        if(this.props.isAuthenticated){
            routes=(
            <Switch>
                <Route path='/races' component={Races} />
                 <Route path='/person:id' component={EditPerson} />
                <Route path='/logout' component={LogOut} />
                <Route path='/' exact component={Races} />
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
    autoLogin: ()=>dispatch(autoLogin()),
    fetchPersons: ()=>dispatch(fetchPersons())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
