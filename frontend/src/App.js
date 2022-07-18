
import './App.css';
import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Landing from './components/Pages/Landing'
import UpdateBlog from './components/Form/UpdateBlog';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="container">
      <h1>Frontend</h1>
      <Switch>
<Route exact path='/' render={routerProps => <Landing {...routerProps} setUser={setUser}/> } />
<Route path='/home' render={routerProps => <Home {...routerProps} user={user} />} />
<Route path='/about' component={About} />
<Route path='/update/:id' component={UpdateBlog} />
      </Switch>
    </div>
  );
}

export default App;


