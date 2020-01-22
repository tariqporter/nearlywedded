import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import SaveTheDate from './components/SaveTheDate';
import Admin from './components/Admin';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
if (process.env.NODE_ENV === 'development') {
  app.functions().useFunctionsEmulator('http://localhost:5001');
}

export const Index = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/save-the-date/:userId?">
            <SaveTheDate />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/:userId?">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
