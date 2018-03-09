import React from 'react';
var {
  StyleSheet,
  ListView,
  Button,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} = require('react-native');
import {Field, reduxForm} from 'redux-form/immutable';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as reducers from './reducer';
import * as Actions from './actions'; //Import your actions
import Data from './companies.json';
import CompanyCodeForm from './companyCodeForm';

const CompanyCodePage = () => {
  return (
    <View style={styles.MyForm}>
      <CompanyCodeForm
        onSubmit={values => {
          alert(values.code);
        }}
      />
    </View>
  );
};

export default CompanyCodePage;
//export default reduxForm({
//  form: 'immutableExample', // a unique identifier for this form
//})(CompanyCodePage);

var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
//class companySelector extends React.Component {
//  state = {};

//  componentDidMount() {
//    const {dispatch} = this.props;
//    dispatch(Actions.fetchCompaniesSuccess(Data));
//  }

//  onPress = () => {
//    const {dispatch} = this.props;
//    dispatch(Actions.setActiveCompany(this.state.text));
//  }

//  onChangeText = (text) => {
//    this.setState({
//      text
//    })
//  }

//  render() {
//    const {company} = this.props
//    return (
//      <View style={styles.activityIndicatorContainer}>
//        {company && <Text> {company.name}</Text>}
//        {!company && (
//          <View>
//            <TextInput onChangeText={this.onChangeText} />
//            <Button title='Submit' onPress={this.onPress}/>
//          </View>
//        )}
//      </View>
//    );
//  }
//}

//function mapStateToProps(state, props) {
//  let activeCompany = reducers.getActiveCompany(state)
//  return {
//    company: reducers.getCompany(state, activeCompany),
//  };
//}

////Connect everything
//export default connect(mapStateToProps)(companySelector);

