import React from 'react';
import {Button, View} from 'react-native';
//import {Toolbar} from 'react-native-material-ui';

const Navigation = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', width: 100}}>
      <Button
        title="Logout"
        onPress={() => {
          props.dispatch({
            type: 'LOGOUT',
          });
        }}
      />
    </View>
  );
};

export default Navigation;
