import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    //XXX All this should have been done in redux or helper functions
    //XXX sorry we were rushed on time

    // holds all events for the cal
    var all_events = {};
    // this marks the dates on which you have shifts
    var marked_dates = {};
    // pull schedule and shifts out of props
    const {schedule, shifts} = this.props;
    const shift = {key: 'shift', color: '#EE3E4B', selectedDotColor: '#EE3E4B'};
    const work_event = {key: 'work_event', color: '#1E98C7'};
    // initializes 50 dates on either side of the current date
    for (let i = -50; i < 50; i++) {
      const time = Date.now() + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time); // converts date to string
      const numDay = this.timeToDay(time); // gets the number for the day of the week
      // initialize
      all_events[strTime] = [];
      marked_dates[strTime] = {dots: []};

      //adds employee shifts from schedule
      if (schedule[numDay].work) {
        marked_dates[strTime] = {dots: [shift]};
        all_events[strTime].push({
          height: 50, //sets height of shift
          name: 'Scheduled Shift',
          startTime: schedule[numDay].start,
          endTime: schedule[numDay].end,
          location: schedule[numDay].location,
          icon: 'shift',
        });
      }
    }

    // goes through all employee shifts from shift list and adds them
    shifts.forEach(s => {
      marked_dates[s.date].dots.push(shift);
      all_events[s.date].push({
        height: 50, //sets height of shift
        name: 'Shift',
        startTime: s.start,
        endTime: s.end,
        location: s.location,
        icon: 'shift',
      });
    });

    // goes through all company events and adds them
    this.props.events.forEach(event => {
      marked_dates[event.date].dots.push(work_event);
      all_events[event.date].push({
        name: event.title,
        description: event.description,
        startTime: event.time,
        icon: 'event',
      });
    });

    const selected_date = this.props.navigation.state.params;
    // adds marked dates and events to component state
    this.state = {
      marked: marked_dates,
      items: all_events,
      selected: selected_date,
    };
  }

  render() {
    return (
      <Agenda
        selected={
          this.state.selected
            ? this.state.selected.date
            : this.timeToString(Date.now())
        }
        items={this.state.items}
        markedDates={this.state.marked}
        markingType={'multi-dot'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <View style={[styles.itemText]}>
          <Text style={[styles.itemName]}>{item.name}</Text>
          <Text style={[styles.itemDate]}>
            {item.startTime ? item.startTime : ''}
            {item.endTime ? ' - ' + item.endTime : ''}
          </Text>
          {item.location && (
            <Text style={[styles.itemLoc]}>{item.location}</Text>
          )}
          <Text style={[styles.itemDesc]}>
            {item.description ? item.description : ''}
          </Text>
        </View>
        {this.itemIcon(item.icon)}
      </View>
    );
  }

  itemIcon(icon) {
    switch (icon) {
      case 'shift':
        return (
          <Icon
            name="schedule"
            color="#EE3E4B"
            onPress={() => {
              alert('hi');
            }}
          />
        );
      case 'event':
        return (
          <Icon
            name="date-range"
            color="#1E98C7"
            onPress={() => {
              alert('hi');
            }}
          />
        );
      default:
        return null;
    }
  }

  renderEmptyDate() {
    return <View style={styles.emptyDate} />;
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  // Sunday - Saturday : 0 - 6
  timeToDay(time) {
    const date = new Date(time);
    return date.getDay();
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    margin: 15,
  },
  itemText: {
    flex: 0.85,
  },
  itemDate: {
    opacity: 0.6,
  },
  itemName: {
    fontWeight: '500',
    fontSize: 14,
  },
  itemLoc: {
    opacity: 0.5,
    fontSize: 12,
  },
  itemDesc: {
    fontStyle: 'italic',
    fontSize: 13,
    opacity: 0.5,
  },
});
