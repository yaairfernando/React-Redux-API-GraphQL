import { loginWithGoogle, signOutGoogle } from '../../firebase'
// Constants
let INITIALDATA = {
  loggedIn: false,
  fetching: false
}
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_ERROR = "LOGIN_ERROR"
const SIGN_OUT = "SIGN_OUT"

// Reducer
export default function reducer(state = INITIALDATA, action){
  switch(action.type){
    case SIGN_OUT:
      return { ...INITIALDATA }
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true }
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case LOGIN:
      return { ...state, fetching: true }
    default:
      return state;
  }
}

function saveStorage(storage){
  localStorage.storage = JSON.stringify(storage);
}

// Action Creators
export let signOutAction = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({
    type: SIGN_OUT
  })
  localStorage.removeItem('storage')
}

export let restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  if(storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user
    })
  }
}

export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  })
  return loginWithGoogle()
    .then(user=> {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { 
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
         }
      })
      saveStorage(getState());
    })
    .catch(err=> {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message
      })
    })
}