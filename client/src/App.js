import React from 'react';
import { HashRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Movies from './components/Movies';
import Admin from './components/Admin';
import Home from './components/Home';
import Movie from './components/Movie';
import Genres from './components/Genres';

function App() {
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <h1 className='mt-3'>Mars</h1>
          <hr className='mb-3' />
        </div>
        <div className='row'>
          <div className='col-md-2'>
            <nav>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/movies'>Movies</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/genres'>Genres</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/admin'>Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className='col-md-10'>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/movies/:id' component={Movie} />
              <Route path='/movies'>
                <Movies />
              </Route>
              <Route exact path='/genres'>
                <Genres />
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
