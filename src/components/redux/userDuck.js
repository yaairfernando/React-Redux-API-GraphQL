import { loginWithGoogle } from '../../firebase'
// Constants
let INITIALDATA = {
  loggedIn: false,
  fetching: false
}
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_ERROR = "LOGIN_ERROR"

// Reducer
export default function reducer(state = INITIALDATA, action){
  switch(action.type){
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload }
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
export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  })
  return loginWithGoogle()
    .then(user=> {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...user }
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