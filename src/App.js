import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createStore from './Data/Redux';
import { withStyles } from 'material-ui/styles';

// Import views
import Layout from './Containers/Layout';
import HomeView from './Containers/Home';
import RegisterView from './Containers/Register';
import HelpView from './Containers/Help';
import OrdersView from './Containers/Orders';
import MyNeedsView from './Containers/MyNeeds';
import NewNeedView from "./Containers/NewNeed";

// Build layout components for router
const Home = () => <Layout slot={<HomeView />} />;
const Register = ({ match }) => <Layout slot={<RegisterView match={match} />} />;
const Help = () => <Layout slot={<HelpView />} />;
const Orders = () => <Layout slot={<OrdersView />}/>;
const NewNeeds = () => <Layout slot={<NewNeedView/>}/>
const MyNeeds = () => <Layout slot={<MyNeedsView />} />;

// Create a browser history, and it's middleware
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// create our store, with middlewares
const store = createStore([historyMiddleware]);

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});

const App = _ => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/registro/:type" component={Register} />
        <Route path="/ayuda" component={Help} />
        <Route path="/donaciones" component={Orders}  />
        <Route path="/misNecesidades" component={MyNeeds} />
        <Route path="/necesito" component={NewNeeds}/>
        {/* <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/agregar" component={NeedCreate} />
        <Route exact path="/dashboard/agregarOrden" component={OrderCreate} /> */}
      </div>
    </ConnectedRouter>
  </Provider>
);

export default withStyles(styles)(App);