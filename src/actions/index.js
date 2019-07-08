import axios from 'axios';

export const ACTION = {
  SET_EVENTS: 'SET_EVENTS'
  // GET_VENUES: 'GET_VENUES',
  // SET_VENUES: 'SET_VENUES',
  // MAPGL_SETUP_MAP: 'MAPGL_SETUP_MAP',
};

export const getEventsAction = () => {
  return dispatch => {
    axios.get('/events')
      .then((response) => {
        // console.log(response);
        const { events } = response.data;
        dispatch({
          type: ACTION.SET_EVENTS,
          events
        });
      })
      .catch(err => console.log(err));
  };
}

// export const getVenuesAction = () => {
//   return dispatch => {
//     axios.get('/venues')
//       .then((response) => {
//         console.log(response);
//         const { venues } = response.data;
//         dispatch({
//           type: ACTION.SET_VENUES,
//           venues
//         });
//       })
//       .catch(err => console.log(err));
//   };
// }

// export const setupMapAction = (map) => ({
//   type: ACTION.MAPGL_SETUP_MAP,
//   map
// })