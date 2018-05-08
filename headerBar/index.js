import React from 'react';
import {Header, Icon} from 'react-native-elements';
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
          <Text style={styles.companyText}> Company Name </Text>
        </View>
      }
      rightComponent={
        <View style={styles.rightIcons}>
          <Icon
            name="date-range"
            color="#FFF"
            onPress={() => alert('open calendar')}
          />
          <Icon
            name="notifications"
            color="#FFF"
            onPress={() => alert('show notifications')}
          />
          <Icon
            name="person"
            color="#FFF"
            onPress={() => alert('open profile')}
          />
        </View>
      }
      outerContainerStyles={styles.outerContainerStyles}
    />
  );
};

// TODO Make container width a percentage of screen width
const styles = StyleSheet.create({
  rightIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: 80,
  },
  leftIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
  },
});

export default headerBar;
