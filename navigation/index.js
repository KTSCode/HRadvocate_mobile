import React from 'react';
import {Toolbar} from 'react-native-material-ui';

const Navigation = () => {
  return (
    <Toolbar
      leftElement="menu"
      onLeftElementPress={alert("test")}
    />
  );
};

export default Navigation;
