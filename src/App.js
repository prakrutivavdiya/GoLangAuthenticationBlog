import './App.css';
import SignIn from './Component/signIn';
import SignUp from './Component/signUp';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom'
import Dashboard from './Container/DashBoard/dashboard'
import AuthRoute from './Authguard/authguard';
function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
          <Route path='/' exact component={SignIn}/>
          <Route path='/signUp' exact component={SignUp}/>
          <AuthRoute path='/dashboard' exact component={Dashboard} />
          <Redirect to='/'/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
