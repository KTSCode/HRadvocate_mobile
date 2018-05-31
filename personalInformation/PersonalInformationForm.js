import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import employeeUpdate from './actions';
import AddressInput from './AddressInput';
import Input from './Input';
import Picker from './Picker';
import MyDatePicker from './DatePicker';
import Buttons from './Buttons';

class PersonalInformationForm extends Component {
  render() {
    return(
      <View style={{flex:1}}>
      <ScrollView>

        <Picker
          label="Salutation"
          value={this.props.data.salutation}
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
          onChangeText={value =>
              this.props.employeeUpdate({prop: 'salutation', value})
            }
        />
        <Input
          label="First Name"
          value={this.props.data.firstName}
          required={this.props.requiredFields.firstName}
          modifiable={this.props.modifiableFields.firstName}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'firstName', value})
          }
        />
        <Input
          label="Middle Name"
          value={this.props.data.middleName}
          required={this.props.requiredFields.middleName}
          modifiable={this.props.modifiableFields.middleName}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'middleName', value})
          }
        />
        <Input
          label="Last Name"
          value={this.props.data.lastName}
          required={this.props.requiredFields.lastName}
          modifiable={this.props.modifiableFields.lastName}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'lastName', value})
          }
        />
        <Input
          label="Suffix"
          value={this.props.data.suffix}
          required={this.props.requiredFields.suffix}
          modifiable={this.props.modifiableFields.suffix}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'suffix', value})
          }
        />
        <Input
          label="Nickname"
          value={this.props.data.nickname}
          required={this.props.requiredFields.nickname}
          modifiable={this.props.modifiableFields.nickname}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'nickname', value})
          }
        />
        <Input
          label="Previous Name"
          value={this.props.data.previousName}
          required={this.props.requiredFields.previousName}
          modifiable={this.props.modifiableFields.previousName}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'previousName', value})
          }
        />
        <Input
          label="Phone"
          value={this.props.data.phone}
          required={this.props.requiredFields.phone}
          modifiable={this.props.modifiableFields.phone}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'phone', value})
          }
        />
        <AddressInput />
        <Input
          label="Street 1"
          value={this.props.data.street1}
          required={this.props.requiredFields.street1}
          modifiable={this.props.modifiableFields.street1}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'street1', value})
          }
        />
        <Input
          label="Street 2"
          value={this.props.data.street2}
          required={this.props.requiredFields.street2}
          modifiable={this.props.modifiableFields.street2}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'street2', value})
          }
        />
        <Input
          label="City"
          value={this.props.data.city}
          required={this.props.requiredFields.city}
          modifiable={this.props.modifiableFields.city}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'city', value})
          }
        />
        <Input
          label="State"
          value={this.props.data.state}
          required={this.props.requiredFields.state}
          modifiable={this.props.modifiableFields.state}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'state', value})
          }
        />
        <Input
          label="Postal Code"
          value={this.props.data.postalCode}
          required={this.props.requiredFields.postalCode}
          modifiable={this.props.modifiableFields.postalCode}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'postalCode', value})
          }
        />
        <Input
          label="Country"
          value={this.props.data.country}
          required={this.props.requiredFields.country}
          modifiable={this.props.modifiableFields.country}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'country', value})
          }
        />
        <Input
          label="SSN"
          value={this.props.data.ssn}
          required={this.props.requiredFields.ssn}
          modifiable={this.props.modifiableFields.ssn}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'ssn', value})
          }
        />
        <MyDatePicker
          label="Birthday"
          value={this.props.data.dateOfBirth}
          required={this.props.requiredFields.dateOfBirth}
          modifiable={this.props.modifiableFields.dateOfBirth}
          onChangeText={value =>
            this.props.employeeUpdate({prop: 'dateOfBirth', value})
          }
        />
        <Picker
          label="Marital Status"
          value={this.props.data.maritalStatus}
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
          onChangeText={value =>
              this.props.employeeUpdate({prop: 'maritalStatus', value})
            }
        />
        </ScrollView>
      <Buttons />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {data} = state.employee;
  const {modifiableFields, requiredFields} = state.company.data;

  return {data, modifiableFields, requiredFields};
};

export default connect(mapStateToProps, {employeeUpdate})(
  PersonalInformationForm,
);
