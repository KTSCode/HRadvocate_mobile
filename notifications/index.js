import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    if (props.screenProps.employee.data.newNotifications != []) {
      props.screenProps.dispatch({type: 'CLEAR_NEW_NOTIFICATIONS'});
    }
  }
  render() {
    const notifications = this.props.screenProps.employee.data.notifications;
    return (
      <View style={StyleSheet.absoluteFill}>
        <HeaderBar
          navigation={this.props.navigation}
          company={this.props.screenProps.company.data.name}
          newNotificationCount={
            this.props.screenProps.employee.data.newNotifications.length
          }
        />
        <SectionHeader title="Notifications" top="true" />
        <ScrollView style={styles.notificationsContainer}>
          {notifications.map((n, i) => {
            return (
              <ListItem
                key={i}
                title={n.title}
                subtitle={n.description}
                onPress={() => {
                  this.props.navigation.navigate(n.link);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notificationsContainer: {
    flexDirection: 'column',
  },
});

export default Notifications;
