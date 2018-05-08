import React from 'react';
import {View, ScrollView, StyleSheet, Button} from 'react-native';
import {DrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import Test from './test';
import Test2 from './test2';
import Test3 from './test3';

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
    Test: {
      screen: Test,
    },
    Test2: {
      screen: Test2,
    },
    Test3: {
      screen: Test3,
    },
  },
  {
    drawerWidth: 250,
    contentComponent: CustomDrawerContentComponent,
  },
);
