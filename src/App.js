import {BrowserRouter as Router, Switch} from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard'
import Login from './Login';
import {PrivateRoute, Authform} from './PrivateRoutes.routes';


function App() {
  return (
    <Router>
        <Switch>
          <Authform path="/" component={Login} exact/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
        </Switch>
    </Router>
  );
}

export default App;
