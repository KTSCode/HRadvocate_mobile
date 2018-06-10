import React from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';

const headerBar = props => {
  return (
    <Header
      leftComponent={
        <View style={styles.leftIcons}>
          <Icon
            name="menu"
            color="#FFF"
            onPress={() => {
              props.navigation.navigate('DrawerOpen');
            }}
          />
          <Text style={styles.companyText}> {props.company} </Text>
        </View>
      }
      rightComponent={
        props.newNotificationCount > 0 ? (
          <View style={styles.rightIcons}>
            <Icon
              name="date-range"
              iconStyle={styles.iconStyle}
              color="#FFF"
              onPress={() => {
                const date = new Date();
                const string = date.toISOString().split('T')[0];
                props.navigation.navigate('Calendar', {date: string});
              }}
            />
            <Badge
              onPress={() => props.navigation.navigate('Notifications')}
              containerStyle={{backgroundColor: '#EE3E4B'}}>
              <View style={styles.notificationCounter}>
                <Icon name="notifications" color="#FFF" />
                <Text style={{color: '#FFF', fontSize: 20}}>
                  {props.newNotificationCount}
                </Text>
              </View>
            </Badge>
          </View>
        ) : (
          <View style={styles.rightIcons}>
            <Icon
              name="date-range"
              color="#FFF"
              iconStyle={styles.iconStyle}
              onPress={() => {
                props.navigation.navigate('Calendar');
              }}
            />
            <Icon
              name="notifications"
              color="#FFF"
              onPress={() => props.navigation.navigate('Notifications')}
            />
          </View>
        )
      }
      outerContainerStyles={styles.outerContainerStyles}
    />
  );
};

// TODO Make container width a percentage of screen width
const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 5,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationCounter: {
    flexDirection: 'row',
  },
  companyText: {
    color: '#EEE',
    paddingBottom: 2,
    marginLeft: 5,
    fontSize: 20,
  },
  outerContainerStyles: {
    backgroundColor: '#1D1D20',
    borderBottomWidth: 0,
    paddingBottom: 10,
  },
});

export default headerBar;
