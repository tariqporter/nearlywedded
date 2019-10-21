import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import SaveTheDate from './components/SaveTheDate';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

export const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
));

const Index = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/:userId?" component={App} />
      <Route exact path="/save-the-date/:userId?" component={SaveTheDate} />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
