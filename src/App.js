import React from 'react';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createStore from './Data/Redux';
import Home from './Containers/Home';

// Create a browser history, and it's middleware
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// create our store, with middlewares
const store = createStore([historyMiddleware]);

const App = _ => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <Route exact path="/" component={Home} />
      {/* <Route path="/about" component={About}/> */}
    </ConnectedRouter>
  </Provider>
);

export default App;
