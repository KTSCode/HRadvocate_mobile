import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const Home = props => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar navigation={props.navigation} />
      <SectionHeader title="News" top="true" />
      <ScrollView style={styles.container}>
        {articles.map((a, i) => {
          return (
            <View key={i}>
              <Card title={a.title} image={{uri: a.image}}>
                <Text>
                  {a.image}
                  The idea with React Native Elements is more about component
                  structure than actual design.
                </Text>
              </Card>
            </View>
          );
        })}
      </ScrollView>
      <SectionHeader title="Calendar" />
      <View style={styles.container}>
        <CalendarList
          current={'2018-06-01'}
          minDate={'2018-01-01'}
          maxDate={'2018-12-31'}
          onDayPress={day => {
            alert(day);
            console.log(day);
          }}
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          hideArrows={false}
          renderArrow={direction => (
            <Icon name={'keyboard-arrow-' + direction} color="#000" />
          )}
          horizontal={true}
          displayLoadingIndicator={false}
          pagingEnabled={true}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={true}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          markedDates={{
            '2018-06-16': {selected: true, marked: true, selectedColor: 'blue'},
            '2018-06-17': {marked: true},
            '2018-06-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2018-06-19': {disabled: true, disableTouchEvent: true},
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

const articles = [
  {
    title: 'BIG NEWS',
    description: 'This is super important news about this company',
    image:
      'https://atulkhurana.com/wp-content/uploads/2017/04/important-0-Copy.gif',
  },
  {
    title: 'Improved Benefits',
    description:
      "Don't forget to check your improved benefits in the app today! ",
    image:
      'https://hra.neudesic.com/wp-content/uploads/sites/12/2017/01/hero-module-corehcm.jpg',
  },
  {
    title: 'Fundraiser Reservation',
    description: 'Please RSVP for the company fundraiser no later than Friday',
    image:
      'https://www.framestr.com/wp-content/uploads/2017/08/Fundraiser-Order-Form-Template.gif',
  },
];

export default Home;
