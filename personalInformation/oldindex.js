import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
//import updatePersonalInformation from './actions';
import RNPickerSelect from 'react-native-picker-select';
//import MyDatePicker from './DatePicker.js';
//import PhotoUpload from 'react-native-photo-upload'
//import AddressInput from './AddressInput';

const renderTextInput = ({
  input,
  label,
  meta: {touched, error},
  modifiable,
  required,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <TextInput
        value={input.value}
        editable={modifiable}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        style={styles.textInput}
      />
    </View>
  );
};

const renderPickerInput = ({
  input,
  label,
  meta: {touched, error},
  modifiable,
  required,
  options,
  placeholder,
  items
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <RNPickerSelect
        style={{viewContainer: {justifyContent: 'center'}}}
        placeholder={placeholder}
        items={items}
        onValueChange={input.onChange}
        value={input.value}>


        <TextInput
          value={input.value}
          editable={modifiable}
          onChangeText={input.onChange}
          style={styles.textInput}
        />
        <View style={styles.icon} />
      </RNPickerSelect>
    </View>
  );
};

// const update = val => {
//   console.log(val)
//   updatePersonalInformation(val);
// };

const PersonalForm = props => {
  //props.updatePersonalInformation(val);
  const {handleSubmit, pristine, reset, submitting} = props;

  return (
    <View style={{flex: 1}}>
      <ScrollView>
      <Field
          name="salutation"
          component={renderPickerInput}
          label="Salutation"
          modifiable={props.modifiableField.salutation}
          required={props.requiredField.salutation}
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
      />
        <Field
          name="firstName"
          component={renderTextInput}
          label="First Name"
          modifiable={props.modifiableField.firstName}
          required={props.requiredField.firstName}
        />
        <Field
          name="middleName"
          component={renderTextInput}
          label="Middle Name"
          modifiable={props.modifiableField.middleName}
          required={props.requiredField.middleName}
        />
          <Field
            name="lastName"
            component={renderTextInput}
            label="Last Name"
            modifiable={props.modifiableField.lastName}
            required={props.requiredField.lastName}
          />
          <Field
            name="suffix"
            component={renderTextInput}
            label="Suffix"
            modifiable={props.modifiableField.suffix}
            required={props.requiredField.suffix}
          />
          <Field
            name="nickname"
            component={renderTextInput}
            label="Nickname"
            modifiable={props.modifiableField.nickname}
            required={props.requiredField.nickname}
          />
          <Field
            name="previousName"
            component={renderTextInput}
            label="Maiden Name"
            modifiable={props.modifiableField.previousName}
            required={props.requiredField.previousName}
          />
          <Field
            name="phone"
            component={renderTextInput}
            label="Phone"
            modifiable={props.modifiableField.phone}
            required={props.requiredField.phone}
          />
          <Field
            name="street1"
            component={renderTextInput}
            label="Street 1"
            modifiable={props.modifiableField.street1}
            required={props.requiredField.street1}
          />
          <Field
            name="street2"
            component={renderTextInput}
            label="Street 2"
            modifiable={props.modifiableField.street2}
            required={props.requiredField.street2}
          />
          <Field
            name="city"
            component={renderTextInput}
            label="City"
            modifiable={props.modifiableField.city}
            required={props.requiredField.city}
          />
          <Field
            name="postalCode"
            component={renderTextInput}
            label="Postal Code"
            modifiable={props.modifiableField.postalCode}
            required={props.requiredField.postalCode}
          />
          <Field
            name="ssn"
            component={renderTextInput}
            label="SSN"
            modifiable={props.modifiableField.ssn}
            required={props.requiredField.ssn}
          />
          <Field
              name="maritalStatus"
              component={renderPickerInput}
              label="Marital Status"
              modifiable={props.modifiableField.maritalStatus}
              required={props.requiredField.maritalStatus}
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
          />


        </ScrollView>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}> Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{backgroundColor: '#339933'}]} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({
  label: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  textInput: {
    height: 35,
    width: width * 0.6,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 16,
    marginLeft: 10,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    paddingRight: width * 0.05,
    paddingLeft: width * 0.05,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
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
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'black',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 12.5,
    right: 10,
  },
});

const mapStateToProps = state => {
  return {
    initialValues: state.employee.data,
    modifiableField: state.company.data.modifiableFields,
    requiredField: state.company.data.requiredFields,
  };
};

PersonalForm = reduxForm({
  form: 'personalForm', // a unique identifier for this form
  //onSubmit: update,
  enableReinitialize: true,
})(PersonalForm);

//     <GooglePlacesAutocomplete
//       placeholder='Search'
//       minLength={2} // minimum length of text to search
//       autoFocus={false}
//       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//       listViewDisplayed={false}    // true/false/undefined
//       fetchDetails={true}
//       renderDescription={row => row.description} // custom description render
//       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
//       enablePoweredByContainer = {false}
//       getDefaultValue={() => ''}
//
//       query={{
//         // available options: https://developers.google.com/places/web-service/autocomplete
//         key: 'AIzaSyC2NFMIN_nAUvYc1c8I0Idr7ecSKGubA6Q',
//         language: 'en', // language of the results
//         types: 'address' // default: 'geocode'
//       }}
//
//       styles={{
//
//         container: {
//           flex: 1,
//           //height: 35,
//           width: width * 0.6,
//           // borderColor: 'black',
//           // borderWidth: 1,
//           // borderRadius: 2,
//           //fontSize: 16,
//           marginLeft: 10,
//           //paddingLeft: 10,
//           justifyContent: 'center',
//           alignSelf: 'center',
//         },
//         textInputContainer: {
//           height: 35,
//           width: width * 0.6,
//           borderTopWidth: 0,
//           borderBottomWidth: 0,
//           backgroundColor: '',
//           borderWidth: 0,
//           flexDirection: 'row',
//           flex: 1,
//         },
//         textInput: {
//           borderColor: 'black',
//           borderWidth: 1,
//           borderRadius: 2,
//           backgroundColor: '#FFFFFF',
//           height: 35,
//           paddingTop: 0,
//           paddingBottom: 0,
//           paddingLeft: 10,
//           paddingRight: 0,
//           marginTop: 0,
//           marginLeft: 0,
//           marginRight: 0,
//           fontSize: 16,
//           flex: 1,
//
//         },
//         listView:{
//           position: 'absolute',
//           zIndex: 1,
//           borderRadius:5,
//
//         },
//         description: {
//           fontWeight: 'normal',
//           fontSize: 16,
//           //height: 35,
//           justifyContent: 'flex-end',
//           alignItems: 'center',
//           //position: 'absolute',
//           //zIndex: 3,
//         },
//         predefinedPlacesDescription: {
//           color: '#1faadb'
//         },
//         row: {
//           padding: 7,
//           height: 35,
//           justifyContent: 'center',
//           width: width * 0.6,
//           borderColor: 'black',
//           borderWidth: 1,
//           borderRadius: 2,
//           fontSize: 16,
//           marginLeft: 0,
//           marginBottom: 0,
//           paddingLeft: 0,
//           alignSelf: 'flex-start',
//           backgroundColor: 'white',
//           //position: 'absolute',
//           zIndex: 2,
//         },
//         loader: {
//            flexDirection: 'row',
//            justifyContent: 'center',
//            height: 35,
//          },
//          separator: {
//           height: 0,
//           backgroundColor: 'blue',
//           justifyContent: 'center',
//
// },
//
//       }}
//       nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//       GooglePlacesSearchQuery={{
//         // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//         rankby: 'distance',
//         types: 'address'
//       }}
//
//       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//       //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
//       //renderRightButton={() => <Text>Custom text after the input</Text>}
//     />

export default connect(mapStateToProps)(PersonalForm);
