import axios from 'axios';
import APP from './app.json';
import store from './store.js';

export const getToken = token => ({
  type: 'GET_TOKEN',
  token,
});

export const APILoginAction = token => ({
  type: 'API_LOGIN',
  token,
});

export const saveToken = token => ({
  type: 'SAVE_TOKEN',
  token,
});

export const removeToken = () => ({
  type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
  type: 'LOADING',
  isLoading: bool,
});

export const error = error => ({
  type: 'ERROR',
  error,
});

export const saveAccInfo = value => ({
  type: 'SAVE_USERINFO',
  value,
});

export const saveBalanceInfo = value => ({
  type: 'SAVE_BALANCE_INFO',
  value,
});

export const saveOrderInfo = value => ({
  type: 'SAVE_ORDER_HISTORY',
  value,
});

export const saveRecipients = value => ({
  type: 'SAVE_RECIPIENT_LIST',
  value,
});

export const saveCurrencyPairs = value => ({
  type: 'SAVE_CURRENCY_PAIRS',
  value,
});

export const saveNewOrder = value => ({
  type: 'SAVE_NEW_ORDER',
  value,
});

export const loginAction = values => dispatch => {
  //login with the user value to API
  return axios
    .post(APP.APP_URL + 'api/auth/login', values)
    .then(res => {
      const token_value = res.data.token ? res.data.token : null;
      const expiration = res.data.expiration ? res.data.expiration : null;
      const token = {value: token_value, expiration: expiration};
      dispatch(saveToken(token));
      return Promise.resolve();
    })
    .catch(err => {
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const getMyInfo = () => dispatch => {
  //gets user data from server
  const accessToken = store.getState().root.token.value;
  return axios
    .post(
      APP.APP_URL + 'api/auth/me',
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then(res => {
      dispatch(saveAccInfo(res.data.user));
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const getOrderHistory = () => dispatch => {
  //gets user data from server
  const accessToken = store.getState().root.token.value;
  return axios
    .get(APP.APP_URL + 'api/orders', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      dispatch(saveOrderInfo(res.data.data));
      return Promise.resolve();
    })
    .catch(err => {
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const getRecipientList = () => dispatch => {
  //gets user data from server
  const accessToken = store.getState().root.token.value;
  return axios
    .get(APP.APP_URL + 'api/recipients', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      dispatch(saveRecipients(res.data.data));
      return Promise.resolve();
    })
    .catch(err => {
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const setAccountType = values => dispatch => {
  const accessToken = store.getState().root.token.value;
  return axios
    .post(APP.APP_URL + 'api/users/set-account-type', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      dispatch(saveAccInfo(res.data.data));
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};
export const personalAccountVerfify = values => dispatch => {
  const accessToken = store.getState().root.token.value;
  //submit the personal form data to the server
  return axios
    .put(APP.APP_URL + 'api/users/identity', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      dispatch(saveAccInfo(res.data.data));
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const addressVerify = values => dispatch => {
  const accessToken = store.getState().root.token.value;
  //submit the personal form data to the server
  return axios
    .put(APP.APP_URL + 'api/users/address', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => {
      dispatch(saveAccInfo(res.data.data));
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const getPairs = () => dispatch => {
  const accessToken = store.getState().root.token.value;
  return axios
    .get(APP.APP_URL + 'api/pairs')
    .then(res => {
      dispatch(saveCurrencyPairs(res.data.data));
      return Promise.resolve(res.data.data[0]);
    })
    .catch(err => {
      console.log(err);
      dispatch(error(err.message || 'ERROR'));
      return Promise.reject(err);
    });
};

export const setDocType = value => dispatch => {
  let userInfo = store.getState().root.userinfo;
  userInfo.identity.document_type = value;
  dispatch(saveAccInfo(userInfo));
  return Promise.resolve();
};

export const getUserToken = () => dispatch => {
  const userToken = store.getState().root.token
    ? store.getState().root.token
    : null;
  return userToken;
};

export const removeUserToken = () => dispatch => {
  const userToken = store.getState().root.token
    ? store.getState().root.token
    : null;
  if (userToken) {
    dispatch(removeToken(null));
    return Promise.resolve();
  }
};

// export const saveUserToken = data => dispatch =>
//   AsyncStorage.setItem('userToken', 'abc')
//     .then(data => {
//       dispatch(loading(false));
//       dispatch(saveToken('token saved'));
//     })
//     .catch(err => {
//       dispatch(loading(false));
//       dispatch(error(err.message || 'ERROR'));
//     });

// export const removeUserToken = () => dispatch =>
//   AsyncStorage.removeItem('userToken')
//     .then(data => {
//       dispatch(loading(false));
//       dispatch(removeToken(data));
//     })
//     .catch(err => {
//       dispatch(loading(false));
//       dispatch(error(err.message || 'ERROR'));
//     });

// request API to get wallet balance information
export const requestBalanceInfoAPI = () => dispatch => {
  return null;
};
