import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert, Button} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import ToastBox from '../toastBox/index';

const Documents = props => {
  const events = props.screenProps.company.data.events;
  const articles = props.screenProps.company.data.articles;
  const markedDates = Object.assign.apply(
    Object,
    events.map(elem => {
      var obj = {};
      obj[elem.date] = {
        selected: true,
        marked: true,
        dotColor: 'blue',
      };
      return obj;
    }),
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar navigation={props.navigation} />
      <SectionHeader title="Agenda" />
      <View style={styles.calendarContainer}>
          <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#666'},
          //    '2017-05-09': {textColor: '#666'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
           // monthFormat={'yyyy'}
           // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
      </View>
    </View>
  );
};


const getEvent = (date, events) => {
  var event = events.find(elem => {
    return elem.date == date;
  });
  if (event) {
    return [event.title, event.description];
  } else {
    return [date, 'no events'];
  }
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'column',
  },
  calendarContainer: {
    flexDirection: 'column',
  },
  cardImage: {
    height: 100,
  },

});


export default Documents;


// import React from 'react';
// import {View, StyleSheet, Text, ScrollView, Alert, Button} from 'react-native';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import HeaderBar from '../headerBar/index';
// import SectionHeader from '../sectionHeader/index';
// import ToastBox from '../toastBox/index';
//
// const Documents = props => {
//   const events = props.screenProps.company.data.events;
//   const articles = props.screenProps.company.data.articles;
//   const event = getEvent(day.dateString, events);
//
//   return (
//     <View style={StyleSheet.absoluteFill}>
//       <HeaderBar navigation={props.navigation} />
//       <SectionHeader title="Documents" top="true" />
//       <Button
//         <Icon
//           name='arrow-right'
//           size={15}
//           color='white'
//         />
//       />
//       <ScrollView style={styles.agendaContainer}>
//         <View style={{height: 10}} />
//         <View style = {styles.headerText}>
//           event[0]
//         </view>
//         <hr>
//         //other stuff
//         <hr>
//         <View style = {{align: "right"}}>
//           event[1]
//         </view>
//       </ScrollView>
//     </View>
//   );
// };
//
// const getEvent = (date, events) => {
//   var event = events.find(elem => {
//     return elem.date == date;
//   });
//   if (event) {
//     return [event.title, event.description];
//   } else {
//     return [date, 'no events'];
//   }
// };
//
// const styles = StyleSheet.create({
//   backIcon: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     justifyContent: 'space-between',
//     width: 80,
//   },
//   articleContainer: {
//     flexDirection: 'column',
//   },
//   agendaContainer: {
//     flexDirection: 'column',
//   },
//   cardImage: {
//     height: 100,
//   },
//   headerText: {
//     font-weight: bold,
//     fontSize: 30,
//     align: "right",
//   }
// });
//
//
// export default Documents;
