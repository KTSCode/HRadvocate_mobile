import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Main from './main';

export default class App extends React.Component {
  render() {
    console.log(store.getState())
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
