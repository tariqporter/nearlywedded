import { ACTION } from '../actions';
import { cloneDeep } from 'lodash';
import ls from 'local-storage';

const diffTime = new Date(2020, 8, 4).getTime() - new Date().getTime();
const daysUntilWedding = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

const cacheUser = ls.get('user');

const initialState = {
  user: cacheUser || {
    id: null,
    rsvp: null,
  },
  events: [],
  hotels: [],
  faqs: [],
  daysUntilWedding,
  signedIn: true,
  signInError: '',
  users: [],
  sendingEmailUserIds: [],
  filterUsers: [],
  saveDateSearch: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_USER: {
      const { user } = action;
      ls.set('user', user);
      return { ...state, user };
    }
    case ACTION.SUBMIT_RSVP_SELECTION: {
      const { rsvp } = action;
      const user = { ...state.user, rsvp };
      ls.set('user', user);
      return { ...state, user };
    }
    case ACTION.SET_EVENTS: {
      const { events } = action;
      return { ...state, events };
    }
    case ACTION.SET_HOTELS: {
      const { hotels } = action;
      return { ...state, hotels };
    }
    case ACTION.SET_FAQS: {
      const { faqs } = action;
      return { ...state, faqs };
    }
    case ACTION.SET_SIGN_IN_ERROR: {
      const { signedIn, signInError } = action;
      return { ...state, signedIn, signInError };
    }
    case ACTION.SET_USERS: {
      const { users } = action;
      const filterUsers = cloneDeep(users);
      return { ...state, users, filterUsers };
    }
    case ACTION.SET_SAVE_DATE_SEARCH: {
      const { users } = state;
      const saveDateSearch = action.saveDateSearch.toLocaleLowerCase();
      const filterUsers = users.filter(user => user.name.toLocaleLowerCase().includes(saveDateSearch));
      return { ...state, saveDateSearch, filterUsers };
    }
    case ACTION.SENDING_EMAIL: {
      let { sendingEmailUserIds } = state;
      const { userId } = action;
      sendingEmailUserIds = [...sendingEmailUserIds, userId];
      return { ...state, sendingEmailUserIds };
    }
    case ACTION.SENT_EMAIL: {
      let { sendingEmailUserIds } = state;
      const { userId } = action;
      sendingEmailUserIds = sendingEmailUserIds.filter(x => x !== userId);
      return { ...state, sendingEmailUserIds };
    }
    default:
      return state;
  }
};
