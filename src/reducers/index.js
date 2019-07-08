import { ACTION } from "../actions";
// import { store } from "..";
// import { Map } from '../actions/map'

const initialState = {
  // zoom: 11.5,
  // center: [-73.9924478125191, 40.74830012076461],
  // venues: []
  events: []
};

// let map = new Map();

export default (state = initialState, action) => {
  switch (action.type) {
    // case ACTION.MAPGL_SETUP_MAP: {
    //   map = action.map;
    //   map.addDispatch(store.dispatch);
    //   return state;
    // }
    // case ACTION.SET_VENUES: {
    //   map.setVenues(action.venues);
    //   return state;
    // }
    case ACTION.SET_EVENTS: {
      return { ...state, events: action.events };
    }
    default:
      return state;
  }
}