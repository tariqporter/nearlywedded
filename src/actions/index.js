import axios from 'axios';
import * as firebase from 'firebase/app';

export const ACTION = {
  SET_EVENTS: 'SET_EVENTS',
  SET_USER: 'SET_USER',
  SET_USERS: 'SET_USERS',
  SET_SIGN_IN_ERROR: 'SET_SIGN_IN_ERROR',
  SET_SAVE_DATE_SEARCH: 'SET_SAVE_DATE_SEARCH',
};

export const getEventsAction = () => {
  return dispatch => {
    return axios
      .get(process.env.REACT_APP_API_PATH + 'data/events/')
      .then(response => {
        const { events } = response.data;
        dispatch({
          type: ACTION.SET_EVENTS,
          events,
        });
      })
      .catch(err => console.log(err));
  };
};

export const getUserAction = userId => dispatch => {
  return axios
    .get(process.env.REACT_APP_API_PATH + `data/user/${userId}/`)
    .then(response => {
      const { user } = response.data;
      dispatch({
        type: ACTION.SET_USER,
        user,
      });
    })
    .catch(err => console.log(err));
};

export const updateSaveTheDateViewsAction = userId => dispatch => {
  return axios
    .post(
      process.env.REACT_APP_API_PATH + `data/user/saveTheDateViews/${userId}/`
    )
    .catch(err => console.log(err));
};

export const setSignedInAction = (signedIn, signInError = '') => dispatch => {
  dispatch({
    type: ACTION.SET_SIGN_IN_ERROR,
    signedIn,
    signInError,
  });
};

export const getUsersAction = () => async dispatch => {
  const db = firebase.firestore();
  const data1 = await db.collection('users').get();
  const users = data1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(users);
  dispatch({
    type: ACTION.SET_USERS,
    users,
  });
};

export const logInOutAction = (email, password) => async (
  dispatch,
  getState
) => {
  const { signedIn } = getState();
  if (signedIn) {
    const signedOut = await firebase.auth().signOut();
    dispatch({
      type: ACTION.SET_USERS,
      users: [],
    });
    return signedOut;
  }

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      const signInError = error.message;
      dispatch(setSignedInAction(false, signInError));
    });
};

export const setSaveDateSearchAction = saveDateSearch => {
  return {
    type: ACTION.SET_SAVE_DATE_SEARCH,
    saveDateSearch,
  };
};

export const sendSaveDateEmailAction = userId => {
  return axios.post(process.env.REACT_APP_API_PATH + `sendMail/${userId}/`);
};
