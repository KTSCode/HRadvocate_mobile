import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SectionHeader = props => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
});

export default SectionHeader;
