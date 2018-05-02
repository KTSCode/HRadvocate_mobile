import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
//import Main from './main';
import Downloads from './downloads/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Downloads />
      </Provider>
    );
  }
}
