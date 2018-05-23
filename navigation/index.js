import React from 'react';
import {View, ScrollView, StyleSheet, Button} from 'react-native';
import {DrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import Home from '../homePage/index';
import ClockInOut from '../clockInOut/index';
import Notifications from '../notifications/index';
import Calendar from '../calendar/index';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerItems {...props} />
      <View style={styles.logoutButton}>
        <Button
          title="logout"
          onPress={() => {
            props.screenProps.dispatch({type: 'LOGOUT'});
          }}
        />
      </View>
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    margin: 20,
    justifyContent: 'flex-end',
  },
});
export default DrawerNavigator(
  {
    ClockInOut: {
      screen: ClockInOut,
    },
    Dashboard: {
      screen: Home,
    },
    Calendar: {
      screen: Calendar,
    },
    Notifications: {
      screen: Notifications,
    },
  },
  {
    drawerWidth: 250,
    contentComponent: CustomDrawerContentComponent,
  },
);
