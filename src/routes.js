import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/App';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Expired from './components/Auth/Expired';
import PlacesIndex from './components/Places/PlacesIndex';
import PlacePage from './components/Places/PlacePage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import AboutPage from './components/AboutPage/AboutPage';
import require_auth from './components/Auth/require_auth';
import PrivatePage from './components/PrivatePage/PrivatePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={Login}/>
    <Route path="/logout" component={Logout}/>
    <Route path="/expired" component={Expired}/>
    <Route path="/places">
      <IndexRoute component={PlacesIndex}/>
      <Route path="/places/id/:id" component={PlacePage}/>
    </Route>
    <Route path="/friends" component={FriendsPage}/>
    <Route path="/about" component={AboutPage}/>
    <Route path="/private" component={require_auth(PrivatePage)}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
