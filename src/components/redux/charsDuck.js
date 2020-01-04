import axios from 'axios';
// Constanst
const INITIALDATA = {
  fetching: false,
  array: [],
  current: {}
}
const URL = "https://rickandmortyapi.com/api/character"
const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
// Reducer
export default function reducer(state= INITIALDATA, action) {
  switch(action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true }
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false }
    default:
      return state;
  }
}
// Action Creator
export let getCharactersAction = ()=> (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  })
  return axios.get(URL)
    .then(res => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      });
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message
      })
    })
};