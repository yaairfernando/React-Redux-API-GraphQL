import axios from 'axios';
// Constanst
const INITIALDATA = {
  fetching: false,
  array: [],
  current: {}
}
const URL = "https://rickandmortyapi.com/api"
const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
// Reducer
export default function reducer(state= INITIALDATA, action) {
  switch(action.type) {
    case GET_CHARACTERS:
    case GET_CHARACTERS_ERROR:
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload }
    default:
      return state;
  }
}
// Action Creator
export let getCharacterAction = ()=> (dispatch, getState) => {
  return axios.get(URL)
    .then(res => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      });
    });
};