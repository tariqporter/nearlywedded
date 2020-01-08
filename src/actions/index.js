import * as firebase from 'firebase/app';

export const ACTION = {
  SET_EVENTS: 'SET_EVENTS',
  SET_USER: 'SET_USER',
  SET_USERS: 'SET_USERS',
  SET_SIGN_IN_ERROR: 'SET_SIGN_IN_ERROR',
  SET_SAVE_DATE_SEARCH: 'SET_SAVE_DATE_SEARCH',
  SENDING_EMAIL: 'SENDING_EMAIL',
  SENT_EMAIL: 'SENT_EMAIL',
};

export const getEventsAction = () => async dispatch => {
  const getEvents = firebase.functions().httpsCallable('getEvents');

  const result = await getEvents().catch(err => console.log(err));
  console.log('getEvents', result);

  const { events } = result.data;
  dispatch({
    type: ACTION.SET_EVENTS,
    events,
  });
  return result;
};

export const getUserAction = userId => async dispatch => {
  let user = null;
  if (userId) {
    const getUser = firebase.functions().httpsCallable('getUser');

    const result = await getUser({ userId }).catch(err => console.log(err));
    console.log('getUser', result);

    user = result.data.user;
  }

  dispatch({
    type: ACTION.SET_USER,
    user,
  });
};

export const updateSaveTheDateViewsAction = userId => async dispatch => {
  const viewSaveTheDate = firebase.functions().httpsCallable('viewSaveTheDate');

  const result = await viewSaveTheDate({ userId }).catch(err =>
    console.log(err)
  );
  console.log('viewSaveTheDate', result);
  return result;
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

export const sendSaveDateEmailAction = userId => async dispatch => {
  const sendEmail = firebase.functions().httpsCallable('sendEmail');
  dispatch({
    type: ACTION.SENDING_EMAIL,
    userId,
  });

  const result = await sendEmail({ userId }).catch(err => console.log(err));
  console.log('sendEmail', result);

  dispatch({
    type: ACTION.SENT_EMAIL,
    userId,
  });
  return result;
};
