import Mapview from './Components/Mapview'
import Login from './Components/Login'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {AuthProvider} from './Components/Auth/AuthComtext'
import './App.css';

function App() {
  return (
    <AuthProvider>
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/mapview" component={Mapview}/>

      </Switch>
    </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
