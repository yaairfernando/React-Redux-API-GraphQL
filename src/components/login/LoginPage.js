import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux';
import { doGoogleLoginAction } from '../redux/userDuck';

function LoginPage({ loggedIn, fetching, doGoogleLoginAction }) {
    function googleLogin(){
      doGoogleLoginAction();
    }

    if(fetching) return <h2>Loading...</h2>
    return (
        <div className={styles.container}>
            {loggedIn ? <h1>Sign Out</h1> : <h1>Sign In</h1>}
            {loggedIn ?
              <button>Sign Out</button> :
              <button onClick={googleLogin}>Log In</button>
            }
           
        </div>
    )
}

function matStateToProps({user:{ fetching, loggedIn }}){
  return { 
    fetching,
    loggedIn  
  }
}

export default connect(matStateToProps, { doGoogleLoginAction })(LoginPage);