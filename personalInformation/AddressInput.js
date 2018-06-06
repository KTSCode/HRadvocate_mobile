// import React from 'react';
// import {View,Text,Dimensions, StyleSheet, TextInput} from 'react-native';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
//
// var {height, width} = Dimensions.get('window');
// const AddressInput = ({
//   input,
//   label,
//   meta: {touched, error},
//   modifiable,
//   required,
// }) => {
//   return (
//     <View style={styles.section}>
//       <Text style={styles.label}>
//         {label}
//         {required && <Text style={{color: 'red'}}>*</Text>}
//       </Text>
//
//           <GooglePlacesAutocomplete
//             placeholder='Search'
//             minLength={2} // minimum length of text to search
//             autoFocus={false}
//             returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//             listViewDisplayed='true'    // true/false/undefined
//             fetchDetails={true}
//             renderDescription={row => row.description} // custom description render
//             onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//               console.log(details.address_components);
//             }}
//
//             getDefaultValue={() => ''}
//
//             query={{
//               // available options: https://developers.google.com/places/web-service/autocomplete
//               key: 'AIzaSyAGmC5QcMWrjGRDn_RGyjlrhIfieqCfR68',
//               language: 'en', // language of the results
//               types: 'address' // default: 'geocode'
//             }}
//
//             styles={{
//               container: {
//                 flex: 1,
//               },
//               textInputContainer: {
//                 backgroundColor: 'red',
//                borderTopWidth: 1,
//                borderBottomWidth: 1,
//                 borderTopColor: '#7e7e7e',
//                 borderBottomColor: '#b5b5b5',
//                 flexDirection: 'row',
//                 height: 35,
//                 width: width * 0.6,
//                 borderColor: 'black',
//                 borderWidth: 1,
//                 borderRadius: 2,
//                 fontSize: 16,
//                 marginLeft: 10,
//                 paddingLeft: 10,
//               },
//               textInput: {
//         //        backgroundColor: '#FFFFFF',
//       //          height: 28,
//       //          borderRadius: 5,
//                 paddingTop: 4.5,
//                 paddingBottom: 4.5,
//                 paddingLeft: 10,
//                 paddingRight: 10,
//                 marginTop: 7.5,
//     //            marginLeft: 8,
//                 marginRight: 8,
//                 fontSize: 15,
//                 flex: 1
//                 backgroundColor: '#FFFFFF',
//                 height: 35,
//                 width: width * 0.6,
//                 borderColor: 'black',
//                 borderWidth: 1,
//                 borderRadius: 2,
//                 fontSize: 16,
//                 marginLeft: 10,
//                 paddingLeft: 10,
//
//               },
//               poweredContainer: {
//                 justifyContent: 'flex-end',
//                 alignItems: 'center',
//                 backgroundColor: '#FFFFFF',
//               },
//               powered: {},
//               listView: {},
//               row: {
//                 padding: 13,
//                 height: 44,
//                 flexDirection: 'row',
//               },
//               separator: {
//                 backgroundColor: '#c8c7cc',
//               },
//               description: {},
//               loader: {
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 height: 20,
//               },
//               androidLoader: {
//                 marginRight: -15,
//               },
//             }}
//
//             nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//             GooglePlacesSearchQuery={{
//               // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//               rankby: 'distance',
//               types: 'food'
//             }}
//
//             filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//             debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//           />
//     </View>
//   );
// };
//
// // const AddressInput = () => {
// //   return (
// //     <GooglePlacesAutocomplete
// //       placeholder='Search'
// //       minLength={2} // minimum length of text to search
// //       autoFocus={false}
// //       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
// //       listViewDisplayed='auto'    // true/false/undefined
// //       fetchDetails={true}
// //       renderDescription={row => row.description} // custom description render
// //       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
// //         console.log(details.address_components);
// //       }}
// //
// //       getDefaultValue={() => ''}
// //
// //       query={{
// //         // available options: https://developers.google.com/places/web-service/autocomplete
// //         key: 'AIzaSyAGmC5QcMWrjGRDn_RGyjlrhIfieqCfR68',
// //         language: 'en', // language of the results
// //         types: 'address' // default: 'geocode'
// //       }}
// //
// //       styles={{
// //         textInputContainer: {
// //           width: '100%'
// //         },
// //         description: {
// //           fontWeight: 'bold'
// //         },
// //         predefinedPlacesDescription: {
// //           color: '#1faadb'
// //         }
// //       }}
// //
// //       nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
// //       GooglePlacesSearchQuery={{
// //         // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
// //         rankby: 'distance',
// //         types: 'food'
// //       }}
// //
// //       filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
// //
// //       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
// //     />
// //   );
// // }
//
//
//
// var styles = StyleSheet.create({
//   label: {
//     fontSize: 16,
//     flexWrap: 'wrap',
//   },
//   textInput: {
//     height: 35,
//     width: width * 0.6,
//     borderColor: 'black',
//     borderWidth: 1,
//     borderRadius: 2,
//     fontSize: 16,
//     marginLeft: 10,
//     paddingLeft: 10,
//   },
//   section: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: 50,
//     paddingRight: width * 0.05,
//     paddingLeft: width * 0.05,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   buttonsView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     width: width * 0.3,
//     borderRadius: 4,
//     margin: 5,
//     height: 35,
//     backgroundColor: '#1E98C7',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
//
// export default AddressInput;
