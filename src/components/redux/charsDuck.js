import axios from 'axios';
import { updateDB } from '../../firebase'
// Constanst
const INITIALDATA = {
  fetching: false,
  array: [],
  current: {},
  favorites: []
}
const URL = "https://rickandmortyapi.com/api/character"
const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
const REMOVE_CHARACTER = "REMOVE_CHARACTER"
const ADD_FAVORITES = "ADD_FAVORITES"
// Reducer
export default function reducer(state= INITIALDATA, action) {
  switch(action.type) {
    case ADD_FAVORITES:
      return { ...state, ...action.payload }
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload }
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
export let addToFavoritesAction = () => (dispatch, getState) => {
  let { array, favorites } = getState().characters
  let {uid} = getState().user
  let char = array.shift();
  favorites.push(char);
  updateDB(favorites, uid);
  dispatch({
    type: ADD_FAVORITES,
    payload: { array: [...array], favorites:[...favorites] }
  });
};

export let removeCharacterAction = () => (dispatch, getState) => {
  let {array} = getState().characters;
  array.shift()
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array]
  })
}

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