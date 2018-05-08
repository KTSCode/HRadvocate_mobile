import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderBar from '../headerBar/index';

const Home = props => {
  return (
    <View>
      <HeaderBar navigation={props.navigation} />
      <View style={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
