import axios from 'axios';
import { updateDB, getFavs } from '../../firebase'
import ApolloClient, {gql} from 'apollo-boost';
// Constanst
const INITIALDATA = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
  nextPage: 1
}
const URL = "https://rickandmortyapi.com/api/character"

let client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
})
const UPDATE_PAGE = "UPDATE_PAGE"
const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
const REMOVE_CHARACTER = "REMOVE_CHARACTER"
const ADD_FAVORITES = "ADD_FAVORITES"
const GET_FAVS = "GET_FAVS"
const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS"
const GET_FAVS_ERROR = "GET_FAVS_ERROR"
const GET_FAVORITES_LOCAL = "GET_FAVORITES_LOCAL"

// Reducer
export default function reducer(state= INITIALDATA, action) {
  switch(action.type) {
    case UPDATE_PAGE:
      return { ...state, nextPage: action.payload }
    case GET_FAVORITES_LOCAL:
      return { ...state, fetching: false, favorites: action.payload}
    case GET_FAVS:
      return { ...state, fetching: true}
    case GET_FAVS_ERROR:
      return { ...state, fetching: false, error: action.payload}
    case GET_FAVS_SUCCESS:
      return { ...state, fetching: false, favorites: action.payload}
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
export let retrieveFavs = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVS
  });
  let {uid} = getState().user
  return getFavs(uid)
    .then(arr =>{
      dispatch({
        type: GET_FAVS_SUCCESS,
        payload: [...arr]
      })
    })
    .catch(err =>{
      console.log(err)
      dispatch({
        type: GET_FAVS_ERROR,
        payload: err.message
      })
    })
}

function saveFavorites(favorites){
  localStorage.favorites = JSON.stringify(favorites);
}
//ACTION CREATORS

export let getFavoritesFromLocalStorage = () => (dispatch, getState) =>{
  let favorites = localStorage.getItem('favorites')
  favorites = JSON.parse(favorites);
  if(favorites) {
    dispatch({
      type: GET_FAVORITES_LOCAL,
      payload: favorites
    })
  }
}
export let addToFavoritesAction = () => (dispatch, getState) => {
  let { array, favorites } = getState().characters
  let {uid} = getState().user
  let char = array.shift();
  favorites.push(char);
  updateDB(favorites, uid);
  saveFavorites(favorites);
  dispatch({
    type: ADD_FAVORITES,
    payload: { array: [...array], favorites:[...favorites] }
  });
};

export let removeCharacterAction = () => (dispatch, getState) => {
  let {array} = getState().characters;
  array.shift()
  if(!array.length){
    getCharactersAction()(dispatch, getState);
    return
  }
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array]
  })
}

export let getCharactersAction = ()=> (dispatch, getState) => {
  let query = gql`
  query ($page:Int){
    characters(page:$page){
      info{
        pages
        next
        prev
      }
      results{
        name
        image
      }
    }
  }
  `
  dispatch({
    type: GET_CHARACTERS
  })
  let {nextPage} = getState().characters
  return client.query({
    query,
    variables:{page: nextPage}
  })
  .then(({data, error}) => {
    if (error) {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: error
      })
      return
    }
    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: data.characters.results
    })
    dispatch({
      type: UPDATE_PAGE,
      payload: data.characters.info.next ? data.characters.info.next : 1
    })
  })


  // return axios.get(URL)
  //   .then(res => {
  //     dispatch({
  //       type: GET_CHARACTERS_SUCCESS,
  //       payload: res.data.results
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     dispatch({
  //       type: GET_CHARACTERS_ERROR,
  //       payload: err.response.message
  //     })
  //   })
};