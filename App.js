import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
//import Main from './main';
import Navigation from './navigation/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation dispatch={store.dispatch} />
      </Provider>
    );
  }
}
