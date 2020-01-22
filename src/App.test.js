import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { store } from './reducers/store';
// import { Index } from './index';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import SaveTheDate from './components/SaveTheDate';
import Admin from './components/Admin';
// import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
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
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
