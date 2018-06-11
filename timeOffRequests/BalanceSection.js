import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';


const BalanceSection = ({type, available, pending, approved, used}) => {
  return (
    <View style={styles.balanceSection}>
      <Text style={styles.balanceType}>{type}</Text>
      <Text style={styles.balanceText}/>
      <Text style={styles.balanceHours}>{available}</Text>
      <Text style={styles.balanceText}>Hours Available</Text>
      <Text style={styles.balanceText}/>
      <Text style={styles.balanceText}>Pending: {pending} hours</Text>
      <Text style={styles.balanceText}>Approved: {approved} hours</Text>
      <Text style={styles.balanceText}>Used: {used} hours</Text>
    </View>
  );
};

var {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  balanceSection: {
    height: 180,
    width: width * 0.5,
    marginTop: 20,
    //marginBottom: 0,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#DFDFDF',
  },
  balanceType: {
    fontSize: 18
  },
  balanceHours: {
    fontSize: 30,
    color: 'blue'
  },
  balanceText: {
    fontSize: 14
  },

});

export default BalanceSection;
