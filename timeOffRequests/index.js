import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import BalanceSection from './BalanceSection';
import RequestSection from './RequestSection';
import Button from './Button';
import SubHeader from '../commonComponents/SubHeader';

class TimeOffRequests extends Component {
  render() {
    console.log(this.props.timeOffRequests);
    var requestSections = this.props.timeOffRequests.map(request => {
      var status = request.status.toUpperCase()[0];
      var endDate = '';
      if (request.endDate) {
        endDate += ' - ' + request.endDate;
      }
      return (
        <RequestSection
          key={request.startDate}
          status={status}
          startDate={request.startDate}
          endDate={endDate}
          hours={request.hours}
          type={request.type}
        />
      );
    });
    return (
      <View style={{flex: 1}}>
        <HeaderBar
          navigation={this.props.navigation}
          company={this.props.screenProps.company.data.name}
          newNotificationCount={
            this.props.screenProps.employee.data.newNotifications.length
          }
        />
        <SectionHeader title="Time Off" top="true" />
        <SubHeader title="Balances" />
        <BalanceSection type="PTO" hours={this.props.PTO.available} />
        <BalanceSection type="Floating Holidays" hours="17" />
        <BalanceSection type="Sick Days" hours="8" />
        <Button goTo={this.props.navigation.navigate} />
        <SubHeader title="Requests" />
        <ScrollView>{requestSections}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {floatingHoliday, PTO, sickDay} = state.employee.data.timeOffBalances;
  const {timeOffRequests} = state.employee.data;

  return {floatingHoliday, PTO, sickDay, timeOffRequests};
};

export default connect(mapStateToProps)(TimeOffRequests);
