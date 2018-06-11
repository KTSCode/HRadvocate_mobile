import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

//component that used special library that connects to Google API
//the original styling of this component is very different than it
//was used in this application which is why there is so much styling
//within the container
class AddressInput extends Component {
  render() {
    var {width} = Dimensions.get('window');
    return (
      <View style={styles.section}>
        <Text style={styles.labelStyle}>Address</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details) => {
            //the information received from the google API
            //is parsed and used to update parent component State
            //which in turn is used to populate address inputs
            this.props.updateParentState({street1: data.structured_formatting.main_text});
            const cityStateCountry = data.structured_formatting.secondary_text.split(',');
            this.props.updateParentState({city: cityStateCountry[0]});
            this.props.updateParentState({state: cityStateCountry[1]});
            this.props.updateParentState({country: cityStateCountry[2]});
            var i;
            for (i = details.address_components.length - 1; i >= 0; i--) {
              if (details.address_components[i].short_name.length === 5) {
                this.props.updateParentState({postalCode: details.address_components[i].short_name});
                break;
              }
            }
          }}
          enablePoweredByContainer={false}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyC2NFMIN_nAUvYc1c8I0Idr7ecSKGubA6Q',
            language: 'en', // language of the results
            types: 'address', // default: 'geocode'
          }}
          styles={{
            container: {
              flex: 0,
              width: width * 0.6,
              borderColor: 'red',
              borderWidth: 0,
              marginLeft: 10,
              alignSelf: 'center',
              zIndex: 1,
            },
            textInputContainer: {
              height: 35,
              alignSelf: 'center',
              borderWidth: 0,
              borderColor: 'yellow',
              width: width * 0.6,
              alignItems: 'center',
            },
            textInput: {
              height: 35,
              color: 'black',
              fontSize: 16,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 2,
              zIndex: 3,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 10,
              paddingRight: 0,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              flex: 1,
            },
            listView: {
              position: 'absolute',
              zIndex: 2,
              borderRadius: 2,
              borderWidth: 1,
              borderTopWidth: 0,
              backgroundColor: 'white',
              width: width * 0.6,
              alignSelf: 'center',
              marginTop: 35,
            },
            description: {
              fontWeight: 'normal',
              fontSize: 16,
              height: 20,
              justifyContent: 'center',
              zIndex: 4,
            },
            row: {
              padding: 0,
              height: 35,
              justifyContent: 'center',
              width: width * 0.6,
              borderColor: 'black',
              borderTopWidth: 1,
              borderRadius: 0,
              marginLeft: 0,
              marginBottom: 0,
              marginTop: 0,
              paddingLeft: 10,
              alignSelf: 'flex-start',
              alignItems: 'center',
              zIndex: 3,
              flex: 0,
            },
            loader: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              height: 30,
            },
          }}
          currentLocation={false}
        />
      </View>
    );
  }
}

var {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    paddingRight: width * 0.05,
    paddingLeft: width * 0.05,
    zIndex: 1,
  },
});

export default AddressInput;
