import { ACTION } from '../actions';

const diffTime = new Date(2020, 8, 4).getTime() - new Date().getTime();
const daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const initialState = {
  user: {
    id: null,
  },
  events: [],
  daysUntilWedding,
  signedIn: true,
  signInError: '',
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_USER: {
      return { ...state, user: action.user || initialState.user };
    }
    case ACTION.SET_EVENTS: {
      return { ...state, events: action.events };
    }
    case ACTION.SET_SIGN_IN_ERROR: {
      const { signedIn, signInError } = action;
      return { ...state, signedIn, signInError };
    }
    case ACTION.SET_USERS: {
      const { users } = action;
      return { ...state, users };
    }
    default:
      return state;
  }
};
