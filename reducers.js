import {combineReducers} from 'redux';
const initial_state = {
  token: {},
  loading: false,
  error: null,
  userinfo: {},
  balance: {},
};
const rootReducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return {...state, token: action.token};
    case 'API_LOGIN':
      return {...state, token: action.token};
    case 'SAVE_TOKEN':
      return {...state, token: action.token};
    case 'REMOVE_TOKEN':
      return {...state, token: action.token};
    case 'LOADING':
      return {...state, loading: action.isLoading};
    case 'SAVE_USERINFO':
      return {...state, userinfo: action.value};
    case 'SAVE_BALANCE_INFO':
      return {...state, balance: action.value};
    case 'ERROR':
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default combineReducers({
  root: rootReducer,
});
