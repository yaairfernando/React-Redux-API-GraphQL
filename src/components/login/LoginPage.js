import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux';
import { doGoogleLoginAction } from '../redux/userDuck';

function LoginPage({ fetching, doGoogleLoginAction }) {
    function googleLogin(){
      doGoogleLoginAction();
    }

    if(fetching) return <h2>Loading...</h2>
    return (
        <div className={styles.container}>
            <h1>
                Sign In With Google
            </h1>
            <h1>
                Sign Out
            </h1>
            <button onClick={googleLogin}>
                Log In
            </button>
            <button>
                Sign Out
            </button>
        </div>
    )
}

function matStateToProps({user:{ fetching }}){
  return { fetching }
}

export default connect(matStateToProps, { doGoogleLoginAction })(LoginPage);