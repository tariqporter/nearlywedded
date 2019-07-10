import { ACTION } from "../actions";

const initialState = {
  user: {
    id: null
  },
  events: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_USER: {
      return { ...state, user: action.user || initialState.user };
    }
    case ACTION.SET_EVENTS: {
      return { ...state, events: action.events };
    }
    default:
      return state;
  }
}