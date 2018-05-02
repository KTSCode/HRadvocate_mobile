import React from 'react';
import {Text, View} from 'react-native';
//import {Toolbar} from 'react-native-material-ui';
import {DrawerNavigator} from 'react-navigation';
import {Header} from 'react-native-elements';
import Router from './sidemenu';

const Navigation = props => {
  return (
    <Router />
  );
};

    //<View
    //  style={{
    //    flex: 1,
    //    justifyContent: 'center',
    //    alignSelf: 'center',
    //  }}>
    //  <Text> test </Text>
    //</View>
//const Navigation = props => {
//  return (
//    <View
//      style={{
//        flex: 1,
//      }}>
//      <Header
//        leftComponent={{icon: 'menu', color: '#fff'}}
//        centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
//        rightComponent={{icon: 'home', color: '#fff'}}
//      />
//      <Router />

//      <View
//        style={{
//          flex: 1,
//          justifyContent: 'center',
//          alignSelf: 'center',
//          width: 100,
//        }}>
//        <Button
//          title="Logout"
//          onPress={() => {
//            props.dispatch({
//              type: 'LOGOUT',
//            });
//          }}
//        />
//      </View>
//    </View>
//  );
//};

export default Navigation;
