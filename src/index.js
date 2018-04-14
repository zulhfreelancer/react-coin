import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

const App = () => {
  return (
    <HashRouter>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/currency/:id" component={Detail} />
          <Route component={NotFound} />
        </Switch>

        <div className="github_link_container">
          View on {` `}
          <a className="github_link" target="_blank" href="https://github.com/zulhfreelancer/react-coin">
            GitHub
          </a>
        </div>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
