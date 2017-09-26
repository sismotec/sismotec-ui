import React from 'react';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createStore from './Data/Redux';
import Home from './Containers/Home';
import Orders from './Containers/Orders';
import CreateOrder from './Containers/CreateOrder';

// Create a browser history, and it's middleware
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// create our store, with middlewares
const store = createStore([historyMiddleware]);

const App = _ => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/orders/" component={Orders} />
        <Route path="/createorder/" component={CreateOrder} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
