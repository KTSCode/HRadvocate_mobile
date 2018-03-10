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

import {connect} from 'react-redux';

import CompanyCodeForm from './companyCodeForm';

class CompanyCodePage extends React.Component {
  state = {};
  render() {
    const {found, code} = this.props;
    return (
      <View style={styles.MyForm}>
        {!found && code != '' && <Text> Error code not found </Text>}
        <CompanyCodeForm
          onSubmit={values => {
            this.props.dispatch({type: 'SUBMIT_CODE', code: values.code});
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    code: state.companySelector.code,
    found: state.companySelector.found
  };
};

export default connect(mapStateToProps)(CompanyCodePage);



var styles = StyleSheet.create({
  MyForm: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
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

