import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createStore from './Data/Redux';

// Import views
import Layout from './Containers/Layout';
import HomeView from './Containers/Home';
import LoginView from './Containers/Login'

// Build layout components for router
const Home = () => <Layout slot={<HomeView />} />
const Login = () => <Layout slot={<LoginView />} />

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
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/registro" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/agregar" component={NeedCreate} />
        <Route exact path="/dashboard/agregarOrden" component={OrderCreate} /> */}
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
