import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';


const BalanceSection = ({type, hours}) => {
  return (
    <View style={styles.balanceSection}>
      <Text style={styles.balanceType}>{type}:</Text>
      <Text style={styles.balanceHours}>{hours} hours</Text>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  balanceSection: {
    height: height * 0.1,
    padding: 30,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
  },
  balanceType: {
    fontSize: 18
  },
  balanceHours: {
    fontSize: 18
  },
});

export default BalanceSection;
