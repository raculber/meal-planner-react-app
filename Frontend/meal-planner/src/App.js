import SignUp from "./components/SignIn/SignUp";
import SignIn from './components/SignIn/SignIn';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/sign-in'/>
        </Route>
        <Route path='sign-in'>
          <SignIn/>
        </Route>
        <Route path="/sign-up">
          <SignUp/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
