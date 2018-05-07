import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {View} from 'react-native';

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
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: 80,
          }}>
          <Icon name="date-range" color="#FFF" onPress={() => alert('profile')} />
          <Icon
            name="notifications"
            color="#FFF"
            onPress={() => alert('notifications')}
          />
          <Icon name="person" color="#FFF" onPress={() => alert('profile')} />
        </View>
      }
    />
  );
};

export default headerBar;
