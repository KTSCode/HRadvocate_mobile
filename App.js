import React from 'react';
import {Provider} from 'react-redux';
//import {StyleSheet} from 'react-native';

import store from './store';
import CompanyCodePage from './companySelector/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <CompanyCodePage />
      </Provider>
    );
  }
}
