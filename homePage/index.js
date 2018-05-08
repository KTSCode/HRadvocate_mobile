import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const Home = props => {
  return (
    <View>
      <HeaderBar navigation={props.navigation} />
      <View style={styles.container}>
        <SectionHeader title="News" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
