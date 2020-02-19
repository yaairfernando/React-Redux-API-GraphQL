import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import Routes from './Routes';
import { connect } from 'react-redux';

function App({loggedIn}) {
  return (
    <div>
      <div className="nav-bar">
        <NavLink className="link" activeClassName="active" exact to="/">
          Inicio
        </NavLink>
        <NavLink className="link" activeClassName="active" to="/favs">
          Favoritos
        </NavLink>
        {loggedIn ?
        <NavLink className="link" activeClassName="active" to="/login">
          Sign Out
        </NavLink> :
        <NavLink className="link" activeClassName="active" to="/login">
          Log In
        </NavLink>}
      </div>
      <Routes />
    </div>
  );
}

const stateMapToProps=(state)=>{
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(stateMapToProps)(App);
