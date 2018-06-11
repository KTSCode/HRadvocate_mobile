import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {employeeUpdate} from './actions';
import AddressInput from './AddressInput';
import Input from '../commonComponents/TextInput';
import Picker from '../commonComponents/Picker';
import MyDatePicker from '../commonComponents/DatePicker';
//import Buttons from './Buttons';

class PersonalInformationForm extends Component {
  state = {
    salutation: this.props.data.salutation,
    firstName: this.props.data.firstName,
    middleName: this.props.data.middleName,
    lastName: this.props.data.lastName,
    suffix: this.props.data.suffix,
    nickname: this.props.data.nickname,
    previousName: this.props.data.previousName,
    phone: this.props.data.phone,
    street1: this.props.data.street1,
    street2: this.props.data.street2,
    city: this.props.data.city,
    state: this.props.data.state,
    postalCode: this.props.data.postalCode,
    country: this.props.data.country,
    ssn: this.props.data.ssn,
    dateOfBirth: this.props.data.dateOfBirth,
    maritalStatus: this.props.data.maritalStatus,
  };

  onCancel() {

    this.setState({
      salutation: this.props.data.salutation,
      firstName: this.props.data.firstName,
      middleName: this.props.data.middleName,
      lastName: this.props.data.lastName,
      suffix: this.props.data.suffix,
      nickname: this.props.data.nickname,
      previousName: this.props.data.previousName,
      phone: this.props.data.phone,
      street1: this.props.data.street1,
      street2: this.props.data.street2,
      city: this.props.data.city,
      state: this.props.data.state,
      postalCode: this.props.data.postalCode,
      country: this.props.data.country,
      ssn: this.props.data.ssn,
      dateOfBirth: this.props.data.dateOfBirth,
      maritalStatus: this.props.data.maritalStatus,
    });
    this.dropdown.alertWithType('info', 'Info','Changes were canceled.');
  }

  onSubmit() {
    for (var key in this.state) {
    if (this.state.hasOwnProperty(key)) {
      this.props.employeeUpdate({prop: key, value: this.state[key]});
    }
    }
  }

  updateParentState(object) {
    this.setState(object);
  }

  render() {
    return(
      <View style={{flex:1}}>
      <ScrollView>
        <Picker
          label="Salutation"
          value={this.state.salutation}
          required={this.props.requiredFields.salutation}
          modifiable={this.props.modifiableFields.salutation}
          placeholder={{
            label: 'Select a salutation...',
            value: ''}}
          items={[
            {
              label: '',
              value: '',
            },
            {
              label: 'Ms.',
              value: 'Ms.',
            },
            {
              label: 'Mr.',
              value: 'Mr.',
            },
            {
              label: 'Mrs.',
              value: 'Mrs.',
            },
            {
              label: 'Sir',
              value: 'Sir',
            },
            {
              label: 'Dr.',
              value: 'Dr.',
            },
          ]}
          onChangeText={salutation => this.setState({salutation})}
        />
        <Input
          label="First Name"
          value={this.state.firstName}
          required={this.props.requiredFields.firstName}
          modifiable={this.props.modifiableFields.firstName}
          onChangeText={firstName => this.setState({firstName})}
        />
        <Input
          label="Middle Name"
          value={this.state.middleName}
          required={this.props.requiredFields.middleName}
          modifiable={this.props.modifiableFields.middleName}
          onChangeText={middleName => this.setState({middleName})}
        />
        <Input
          label="Last Name"
          value={this.state.lastName}
          required={this.props.requiredFields.lastName}
          modifiable={this.props.modifiableFields.lastName}
          onChangeText={lastName => this.setState({lastName})}
        />
        <Input
          label="Suffix"
          value={this.state.suffix}
          required={this.props.requiredFields.suffix}
          modifiable={this.props.modifiableFields.suffix}
          onChangeText={suffix => this.setState({suffix})}
        />
        <Input
          label="Nickname"
          value={this.state.nickname}
          required={this.props.requiredFields.nickname}
          modifiable={this.props.modifiableFields.nickname}
          onChangeText={nickname => this.setState({nickname})}
        />
        <Input
          label="Previous Name"
          value={this.state.previousName}
          required={this.props.requiredFields.previousName}
          modifiable={this.props.modifiableFields.previousName}
          onChangeText={previousName => this.setState({previousName})}
        />
        <Input
          label="Phone"
          value={this.state.phone}
          required={this.props.requiredFields.phone}
          modifiable={this.props.modifiableFields.phone}
          onChangeText={phone => this.setState({phone})}
        />
        <AddressInput
          updateParentState={this.updateParentState.bind(this)}
        />
        <Input
          label="Street 1"
          value={this.state.street1}
          required={this.props.requiredFields.street1}
          modifiable={this.props.modifiableFields.street1}
          onChangeText={street1 => this.setState({street1})}
        />
        <Input
          label="Street 2"
          value={this.state.street2}
          required={this.props.requiredFields.street2}
          modifiable={this.props.modifiableFields.street2}
          onChangeText={street2 => this.setState({street2})}
        />
        <Input
          label="City"
          value={this.state.city}
          required={this.props.requiredFields.city}
          modifiable={this.props.modifiableFields.city}
          onChangeText={city => this.setState({city})}
        />
        <Input
          label="State"
          value={this.state.state}
          required={this.props.requiredFields.state}
          modifiable={this.props.modifiableFields.state}
          onChangeText={state => this.setState({state})}
        />
        <Input
          label="Postal Code"
          value={this.state.postalCode}
          required={this.props.requiredFields.postalCode}
          modifiable={this.props.modifiableFields.postalCode}
          onChangeText={postalCode => this.setState({postalCode})}
        />
        <Input
          label="Country"
          value={this.state.country}
          required={this.props.requiredFields.country}
          modifiable={this.props.modifiableFields.country}
          onChangeText={country => this.props.setState({country})}
        />
        <Input
          label="SSN"
          value={this.state.ssn}
          required={this.props.requiredFields.ssn}
          modifiable={this.props.modifiableFields.ssn}
          onChangeText={ssn => this.props.setState({ssn})}
        />
        <MyDatePicker
          label="Birthday"
          value={this.state.dateOfBirth}
          required={this.props.requiredFields.dateOfBirth}
          modifiable={this.props.modifiableFields.dateOfBirth}
          onChangeText={dateOfBirth => this.setState({dateOfBirth})}
        />
        <Picker
          label="Marital Status"
          value={this.state.maritalStatus}
          required={this.props.requiredFields.maritalStatus}
          modifiable={this.props.modifiableFields.maritalStatus}
          placeholder={{
            label: 'Select a marital status...',
            value: ''}}
          items={[
            {
              label: '',
              value: '',
            },
            {
              label: 'Single',
              value: 'Single',
            },
            {
              label: 'Married',
              value: 'Married',
            },
            {
              label: 'Divorced',
              value: 'Divorced',
            },
            {
              label: 'Separated',
              value: 'Separated',
            },
            {
              label: 'Widowed',
              value: 'Widowed',
            },
          ]}
          onChangeText={maritalStatus => this.setState({maritalStatus})}
        />
        </ScrollView>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onCancel()}>
            <Text style={styles.buttonText}> Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{backgroundColor: '#339933'}]}
            onPress={()=> this.onSubmit()}>
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
        </View>
        <DropdownAlert ref={ref => this.dropdown = ref}/>
      </View>
    );
  }
}

var {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  button: {
    width: width * 0.3,
    borderRadius: 4,
    margin: 5,
    height: 35,
    backgroundColor: '#3F4952',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = state => {
  const {data} = state.employee;
  const {modifiableFields, requiredFields} = state.company.data;

  return {data, modifiableFields, requiredFields};
};

export default connect(mapStateToProps, {employeeUpdate})(PersonalInformationForm);
