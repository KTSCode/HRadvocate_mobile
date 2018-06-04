import React from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const TimeCard = props => {
  const punches = props.screenProps.timeclock.punches;
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
      />
      <SectionHeader title="Time Card" top="true" />
      <ScrollView style={styles.notificationsContainer}>
        {createTimeCard(punches)}
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const createTimeCard = p => {
  var return_punches = [];
  var card_counter = 0;
  for (var date in p) {
    card_counter = card_counter + 1;
    return_punches.push(
      <View>
        <Card title={date} key={card_counter}>
          {p[date].map((t, i) => {
            const ci = t.clockIn.split(' ');
            if (t.clockOut) {
              const co = t.clockOut.split(' ');
              return (
                <ListItem
                  key={i}
                  title={
                    'Clock In: ' +
                    mil2AMPM(ci[4]) +
                    '\n' +
                    'Clock Out: ' +
                    mil2AMPM(co[4])
                  }
                  titleNumberOfLines={2}
                  subtitle={'Duration: ' + timeBetween(t.clockIn, t.clockOut)}
                  hideChevron={true}
                />
              );
            } else {
              return (
                <ListItem
                  key={i}
                  title={'In Progress:' + '\n' + 'Clock In: ' + mil2AMPM(ci[4])}
                  titleNumberOfLines={2}
                  subtitle={'Duration: ' + timeBetween(t.clockIn, Date.now())}
                  hideChevron={true}
                />
              );
            }
          })}
        </Card>
      </View>,
    );
  }
  return return_punches;
};

const mil2AMPM = time => {
  time = time.split(':'); // convert to array
  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  var seconds = Number(time[2]);
  var timeValue;
  if (hours > 0 && hours <= 12) {
    timeValue = '' + hours;
  } else if (hours > 12) {
    timeValue = '' + (hours - 12);
  } else if (hours == 0) {
    timeValue = '12';
  }
  timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
  timeValue += seconds < 10 ? ':0' + seconds : ':' + seconds; // get seconds
  timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM
  return timeValue;
};

const msToTime = duration => {
  var seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  return hours + 'h ' + minutes + 'm ' + seconds + 's';
};

const timeBetween = (date1, date2) => {
  const temp_date1 = new Date(date1);
  const temp_date2 = new Date(date2);
  const duration = temp_date2.getTime() - temp_date1.getTime();
  return msToTime(duration);
};

const styles = StyleSheet.create({
  notificationsContainer: {
    flexDirection: 'column',
  },
});

export default TimeCard;
