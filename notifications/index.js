import React from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';

const Notifications = props => {
  const notifications = props.screenProps.employee.data.notifications;

  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
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
                props.navigation.navigate(n.link);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainer: {
    flexDirection: 'column',
  },
});

export default Notifications;
