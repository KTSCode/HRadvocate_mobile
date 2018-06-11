import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';


const RequestSection = ({status, startDate, endDate, type, hours}) => {

  var formattedStartDate= moment(startDate,'MM-DD-YYYY').format('dddd, MMM Do');
  if(startDate !== endDate){
    formattedStartDate += ' to '
    var formattedEndDate= moment(endDate,'MM-DD-YYYY').format('dddd, MMM Do');
  }
  var statusCapitalized = status.charAt(0).toUpperCase() + status.slice(1);
  var color = 'blue';
  switch(statusCapitalized[0]) {
    case 'A':{
      color = 'green';
      break;
    }
    case 'D': {
      color = 'red';
      break;
    }
  }


  return(
    <View style={styles.sectionContainer}>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText,{color}]}>
          {statusCapitalized[0]}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.dateRange}>
          {formattedStartDate}{formattedEndDate}
        </Text>
        <Text style={styles.typeHours}>
          {type} • {hours} hours • {statusCapitalized}
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
    fontSize: 30,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateRange: {
    fontSize: 14
  },
  typeHours: {
    fontSize: 14
  }
});

export default RequestSection;
