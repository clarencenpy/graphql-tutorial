import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import ChannelsList from './components/ChannelsList';
import ChannelDetails from './components/ChannelDetails';
import NotFound from './components/NotFound';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Link to="/" className="navbar">
        React + GraphQL Tutorial
      </Link>
      <div className="App-body">
        <Switch>
          <Route exact path="/" component={ChannelsList} />
          <Route path="/channel/:channelId" component={ChannelDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
