import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SectionHeader = props => {
  // if the top section header, then don't put any padding on the top
  var topPadding = 10;
  if (props.top) {
    topPadding = 0;
  }

  return (
    <View style={styles.container}>
      <Text style={[{paddingTop: topPadding}, styles.title]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    padding: 10,
    backgroundColor: '#1D1D20',
    color: '#EEE',
    textAlign: 'center',
  },
});

export default SectionHeader;
