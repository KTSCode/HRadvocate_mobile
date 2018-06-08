import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const SubHeader = ({title, rightText}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionText}>{title}</Text>
      {rightText && <Text style={styles.sectionText}>{rightText}</Text>}
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  sectionContainer: {
    width: width,
    height: 40,
    backgroundColor: '#DFDFDF',
    paddingLeft: 20,
    paddingRight:20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionText: {
    fontSize: 16,
  },
});

export default SubHeader;
