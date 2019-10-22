import axios from 'axios';

export const ACTION = {
  SET_EVENTS: 'SET_EVENTS',
  SET_USER: 'SET_USER'
};

export const getEventsAction = () => {
  return dispatch => {
    return axios.get(process.env.REACT_APP_API_PATH + 'data/events/')
      .then((response) => {
        const { events } = response.data;
        dispatch({
          type: ACTION.SET_EVENTS,
          events
        });
      })
      .catch(err => console.log(err));
  };
};

export const getUserAction = userId => dispatch => {
  return axios.get(process.env.REACT_APP_API_PATH + `data/user/${userId}/`)
    .then((response) => {
      const { user } = response.data;
      dispatch({
        type: ACTION.SET_USER,
        user
      });
    })
    .catch(err => console.log(err));
};

export const updateSaveTheDateViewsAction = userId => dispatch => {
  return axios.post(process.env.REACT_APP_API_PATH + `data/user/saveTheDateViews/${userId}/`)
    .catch(err => console.log(err));
}