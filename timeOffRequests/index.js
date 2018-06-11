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
    var reverseArray = this.props.timeOffRequests.reverse();
    var requestSections = reverseArray.map(request => {
      return(
        <RequestSection
          key={request.startDate}
          status={request.status}
          startDate={request.startDate}
          endDate={request.endDate}
          hours={request.hours}
          type={request.type}
        />
      );
    }
);

  this.props.timeOffRequests.reverse();
    return(
      <View style={{ flex: 1 }}>
        <HeaderBar
          navigation={this.props.navigation}
          company={this.props.screenProps.company.data.name}
          newNotificationCount={
            this.props.screenProps.employee.data.newNotifications.length
          }
        />
        <SectionHeader title="Time Off" top="true" />
        <SubHeader title="Balances" />
        <View style={{height:220}}>
          <ScrollView horizontal={true}>
            <BalanceSection
              type="Paid Time Off"
              available={this.props.PTO.available}
              pending={this.props.PTO.pending}
              approved={this.props.PTO.approved}
              used={this.props.PTO.used}
            />
            <BalanceSection
              type="Floating Holidays"
              available={this.props.floatingHoliday.available}
              pending={this.props.floatingHoliday.pending}
              approved={this.props.floatingHoliday.approved}
              used={this.props.floatingHoliday.used}
            />

            <BalanceSection
              type="Sick Days"
              available={this.props.sickDay.available}
              pending={this.props.sickDay.pending}
              approved={this.props.sickDay.approved}
              used={this.props.sickDay.used}
            />
          </ScrollView>
        </View>
        <Button goTo={this.props.navigation.navigate}/>
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
