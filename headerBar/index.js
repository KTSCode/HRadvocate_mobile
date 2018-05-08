import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';

const headerBar = props => {
  return (
    <Header
      leftComponent={
        <Icon
          name="menu"
          color="#FFF"
          onPress={() => {
            props.navigation.navigate('DrawerOpen');
          }}
        />
      }
      rightComponent={
        <View
          style={styles.rightIcons}>
          <Icon
            name="date-range"
            color="#FFF"
            onPress={() => alert('open calendar')}
          />
          <Icon
            name="notifications"
            color="#FFF"
            onPress={() => alert('show notifications')}
          />
          <Icon
            name="person"
            color="#FFF"
            onPress={() => alert('open profile')}
          />
        </View>
      }
    />
  );
};

// TODO Make container width a percentage of screen width
const styles = StyleSheet.create({
  rightIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: 80,
  },
});

export default headerBar;
