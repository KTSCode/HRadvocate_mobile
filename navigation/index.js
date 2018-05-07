import React from 'react';
import {ScrollView, StyleSheet, Button} from 'react-native';
import Test from './test';
import Test2 from './test2';
import Test3 from './test3';
import {DrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerItems {...props} />
      <Button
        title="logout"
        onPress={() => {
          props.screenProps.dispatch({type: 'LOGOUT'});
        }}
      />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
