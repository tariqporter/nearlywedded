import { ACTION } from "../actions";

const date1 = new Date('9/4/2020');
const date2 = new Date();
const diffTime = Math.abs(date1.getTime() - date2.getTime());
const daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const initialState = {
  user: {
    id: null
  },
  events: [],
  daysUntilWedding
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