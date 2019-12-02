import React from 'react';
import Routes from './routes';
import { ConnectedRouter } from 'connected-react-router';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Routes />
      </ConnectedRouter>
    );
  }
}
