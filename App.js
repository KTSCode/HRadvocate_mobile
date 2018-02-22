import React from 'react';
import {Provider} from 'react-redux';
//import {StyleSheet} from 'react-native';

import store from './store';
import BusinessSelector from './businessSelector/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BusinessSelector />
      </Provider>
    );
  }
}

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//});
