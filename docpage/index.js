import React from 'react';
import {View, StyleSheet, ScrollView, Text, Linking} from 'react-native';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Documents = props => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <HeaderBar
        navigation={props.navigation}
        company={props.screenProps.company.data.name}
        newNotificationCount={
          props.screenProps.employee.data.newNotifications.length
        }
      />
      <SectionHeader title="Documents" top="true" />
      <ScrollView style={styles.articleContainer}>
        <Text style={[styles.sectiontitle]}>Company Files</Text>
        <View style={[styles.item]}>
          <View style={[styles.itemText]}>
            <Text style={[styles.itemTextStyle]}>Harassment Policy</Text>
          </View>
          <FontAwesomeIcon
            style={[styles.itemIcon]}
            name="download"
            size={30}
            onPress={() => {
              Linking.openURL(
                'http://www.ilo.org/wcmsp5/groups/public/---asia/---ro-bangkok/---ilo-suva/documents/policy/wcms_407364.pdf',
              );
            }}
          />
        </View>
        <View style={[styles.item]}>
          <View style={[styles.itemText]}>
            <Text style={[styles.itemTextStyle]}>Proof of Insurance</Text>
          </View>
          <FontAwesomeIcon
            style={[styles.itemIcon]}
            name="download"
            size={30}
            onPress={() => {
              Linking.openURL(
                'https://www.independentagent.com/Education/VU/SiteAssets/Documents/PDF/ACORD/ACORD27EvidenceOfPropertyInsurance.pdf',
              );
            }}
          />
        </View>
        <Text style={[styles.sectiontitle]}>Personal Documents</Text>
        <View style={[styles.item]}>
          <View style={[styles.itemText]}>
            <Text style={[styles.itemTextStyle]}>2017 W2 Form</Text>
          </View>
          <FontAwesomeIcon
            style={[styles.itemIcon]}
            name="download"
            size={30}
            onPress={() => {
              Linking.openURL('https://www.irs.gov/pub/irs-pdf/fw2.pdf');
            }}
          />
        </View>
        <View style={[styles.item]}>
          <View style={[styles.itemText]}>
            <Text style={[styles.itemTextStyle]}>Dependencies Form</Text>
          </View>
          <FontAwesomeIcon
            style={[styles.itemIcon]}
            name="download"
            size={30}
            onPress={() => {
              Linking.openURL('https://www.irs.gov/pub/irs-pdf/f8332.pdf');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'column',
  },
  sectiontitle: {
    padding: 10,
    backgroundColor: '#DFDFDF',
    textAlign: 'left',
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 0.85,
  },
  itemTextStyle: {
    padding: 15,
    marginLeft: 40,
    fontSize: 18,
  },
  itemIcon: {
    marginTop: 15,
    marginRight: 25,
    opacity: 0.7,
  },
});

export default Documents;
