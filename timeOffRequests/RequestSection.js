import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';


const RequestSection = ({status, startDate, endDate, type, hours}) => {

  return(
    <View style={styles.sectionContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {status}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.dateRange}>
          {startDate}{endDate}
        </Text>
        <Text style={styles.typeHours}>
          {type} {hours}
        </Text>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
    alignItems: 'center',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.2,
    height: height * 0.1,
  },
  statusText: {
    fontSize: 30
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateRange: {
    fontSize: 16
  },
  typeHours: {
    fontSize: 14
  }
});

export default RequestSection;
