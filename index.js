import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
window.jQuery = window.$ =  require('jquery/dist/jquery.min');
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import App from './modules/App';
import Home from './modules/Home';
import Posts from './modules/Posts';
import Post from './modules/Post';
import Photos from './modules/Photos';
import Photo from './modules/Photo';
import Users from './modules/Users';
import User from './modules/User';
import Contact from './modules/Contact';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/posts" component = {Posts} />
      <Route path="/posts/:id" component = {Post}/>
      <Route path="/photos" component = {Photos}/>
      <Route path="/photos/:id" component = {Photo}/>
      <Route path="/users" component = {Users}/>
      <Route path="/users/:id" component = {User} />
      <Route path="/contact" component = {Contact}/>
    </Route>
  </Router>
), document.getElementById('app'));
