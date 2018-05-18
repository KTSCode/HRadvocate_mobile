import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Main from './main';
import Clock from './clockInOut/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Clock />
      </Provider>
    );
  }
}
