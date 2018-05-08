import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Main from './main';
//import Home from './homePage/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
