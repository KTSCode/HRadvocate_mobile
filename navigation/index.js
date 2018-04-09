import React from 'react';
import {Toolbar} from 'react-native-material-ui';

const Navigation = () => {
  return (
    <Toolbar
      leftElement="menu"
      centerElement="Searchable"
      searchable={{
        autoFocus: true,
        placeholder: 'Search',
      }}
    />
  );
};

export default Navigation;
