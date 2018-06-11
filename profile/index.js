import React, {Component} from 'react';
import {View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text} from 'react-native';
import {connect} from 'react-redux';
import HeaderBar from '../headerBar/index';
import SectionHeader from '../sectionHeader/index';
import DropdownAlert from 'react-native-dropdownalert';
import {employeeUpdate} from './actions';
import AddressInput from './AddressInput';
import Input from '../commonComponents/TextInput';
import Picker from '../commonComponents/Picker';
import MyDatePicker from '../commonComponents/DatePicker';

class Profile extends Component {
  //initial state retreived from the Json file used to update and modify fields
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

  //when the user clicks on cancel,
  //the original (or last saved) data is retreived from the reducer
  //this data is then used to repopulate the fields
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
    //notification that pops up
    this.dropdown.alertWithType('info', 'Info','Changes were canceled.');
  }

//used to assist in displaying notifications to the user
//gets a readable string from the key in the json File
  getKeyString(key) {
    var wordsObject = {
      salutation: 'Salutation',
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name',
      suffix: 'Suffix',
      nickname: 'Nickname',
      previousName: 'Previous Name',
      phone: 'Phone',
      street1: 'Street 1',
      street2: 'Street 2',
      city: 'City',
      state: 'State',
      postalCode: 'Postal Code',
      country: 'Country',
      ssn: 'SSN',
      dateOfBirth: 'Birthday',
      maritalStatus: 'Marital Status',
    };
    return wordsObject[key];
  }

  //ensures that all required fields are filled
  //returns true, if all required fields are filled in, false otherwise
  validateRequired() {
    var error = ''
    //adds missing fields to string
    for (var key in this.state){
      if (this.state.hasOwnProperty(key)) {
        if (this.props.requiredFields[key] && this.state[key] === ''){
          error += 'Missing Field: ' + this.getKeyString(key) + '\n';
        }
      }
    }
    //if there are missing fields, display the error message
    if (error !== '') {
      error = 'Please fill out all required fields. \n' + error;
      //notification that pops up
      this.dropdown.alertWithType('error', 'Error', error);
      return false;
    }
    return true;
  }

  //ensures that SSN input is valid
  validateSSN() {
    var ssnregex = /^\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX$/;
    var match = this.state.ssn.match(ssnregex);
    if (!match){
      //notification that pops up
      this.dropdown.alertWithType(
        'error',
        'Error',
        'Invalid SSN input. \nFormat should be: XXX-XX-XXXX');
      return false;
    }
    return true;
  }

  //ensures that Phone input is valid
  validatePhone() {
    var phoneregex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var match = this.state.phone.match(phoneregex);
    if (!match){
      //notification that pops up
      this.dropdown.alertWithType(
        'error',
        'Error',
        'Invalid Phone input. \nFormat should be: XXX-XXX-XXXX');
      return false;
    }
    return true;
  }

//ensures that Postal Code input is valid
  validatePostalCode() {
    var postalcoderegex = /^\d{5}(-\d{4})?$/;
    var match = this.state.postalCode.match(postalcoderegex);
    if (!match){
      //notification that pops up
      this.dropdown.alertWithType(
        'error',
        'Error',
        'Invalid Postal Code input. \nFormat should be: XXXXX or XXXXX-XXXX');
      return false;
    }
    return true;
  }

  //calls all validation functions
  //if one of them fails, it returns without submitting
  onSubmit() {
    if(!this.validateRequired() || !this.validateSSN() || !this.validatePhone() || !this.validatePostalCode()){
      return;
    }
    //for each field in the State
    //calls the employeeUpdate action to update state
    for (var key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        this.props.employeeUpdate({prop: key, value: this.state[key]});
      }
    }
    //notification that pops up
    this.dropdown.alertWithType('success', 'Success','Changes were saved.');
  }

  //passed to child component so that when its state Changes
  //we can update the change in the parent component
  updateParentState(object) {
    this.setState(object);
  }

  //render method that holds entire contents of profile page
  render() {
    return(
      //flex: 1 is needed in order for scroll view to work
      <View style={{ flex: 1 }}>
        <HeaderBar
          navigation={this.props.navigation}
          company={this.props.screenProps.company.data.name}
        />
        <SectionHeader title="Profile" top="true" />
        <View style={{flex:1}}>
          <ScrollView>
            {
              //all fields use component level state to update value
              //nothing is sent to reducer until save button is pressed
              //the componenets that were used are custom componenets
              //made to all have the same width, height, label, padding, etc
            }
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
            {
              //uses a special component that makes calls to the google API
              //it passes a function so that the child component can have a way
              //to update state in the parent component(this component)
              //the component uses the return string (an address)
              //to autofill the adress components of the page
            }
            <AddressInput
              updateParentState={this.updateParentState.bind(this)}
            />
            {
              //Whenever the address component are pressed, a notification is displayed
              //that informs the user that they should use the AdressInput component
              //above to auto populate these fields
            }
            <Input
              label="Street 1"
              value={this.state.street1}
              required={this.props.requiredFields.street1}
              modifiable={this.props.modifiableFields.street1}
              onChangeText={street1 => this.setState({street1})}
              onFocus={() => this.dropdown.
                alertWithType(
                  'info',
                  'Info',
                  'Please use the Address Input to autofill this field.')}
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
              onFocus={() => this.dropdown.
                alertWithType(
                  'info',
                  'Info',
                  'Please use the Address Input to autofill this field.')
              }
            />
            <Input
              label="State"
              value={this.state.state}
              required={this.props.requiredFields.state}
              modifiable={this.props.modifiableFields.state}
              onChangeText={state => this.setState({state})}
              onFocus={() => this.dropdown.
                alertWithType(
                  'info',
                  'Info',
                  'Please use the Address Input to autofill this field.')
              }
            />
            <Input
              label="Postal Code"
              value={this.state.postalCode}
              required={this.props.requiredFields.postalCode}
              modifiable={this.props.modifiableFields.postalCode}
              onChangeText={postalCode => this.setState({postalCode})}
              onFocus={() => this.dropdown.
                alertWithType(
                  'info',
                  'Info',
                  'Please use the Address Input to autofill this field.')
              }
            />
            <Input
              label="Country"
              value={this.state.country}
              required={this.props.requiredFields.country}
              modifiable={true}
              onChangeText={country => this.setState({country})}
              onFocus={() => this.dropdown.
                alertWithType(
                  'info',
                  'Info',
                  'Please use the Address Input to autofill this field.')
              }
            />
            <Input
              label="SSN"
              value={this.state.ssn}
              required={this.props.requiredFields.ssn}
              modifiable={this.props.modifiableFields.ssn}
              onChangeText={ssn => this.setState({ssn})}
            />
            <MyDatePicker
              label="Birthday"
              value={this.state.dateOfBirth}
              required={this.props.requiredFields.dateOfBirth}
              modifiable={this.props.modifiableFields.dateOfBirth}
              onChangeText={dateOfBirth => this.setState({dateOfBirth})}
              minDate={'01-01-1990'}
              maxDate={'12-31-2018'}
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
          {
            //cancel and save buttons
            //each button calls their respective function from above
          }
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
        </View>
        <DropdownAlert
          messageNumOfLines={12}
          ref={ref => this.dropdown = ref}
        />
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

//used to retreive information from redux
const mapStateToProps = state => {
  const {data} = state.employee;
  const {modifiableFields, requiredFields} = state.company.data;

  return {data, modifiableFields, requiredFields};
};

//used to connect to redux
//second argument is action caller
export default connect(mapStateToProps, {employeeUpdate})(Profile);
