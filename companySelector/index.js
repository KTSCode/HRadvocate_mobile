import React from 'react';
var {
  StyleSheet,
  ListView,
  Button,
  View,
  Text,
  TextInput,
  Image,
} = require('react-native');

import {connect} from 'react-redux';

import CompanyCodeForm from './companyCodeForm';
import LoginPage from '../login/index';
import {Provider} from 'react-redux';

class CompanyCodePage extends React.Component {
  state = {};
  render() {
    const {found, code, name} = this.props;
    //All images must be required at load time
    const logos = {
      abc: require('../images/abc.jpg'),
      riptide: require('../images/riptide.jpg'),
      cool: require('../images/cool.jpg'),
    }
    if (found) {
      return (
        <View style={styles.MyForm}>
          <Image
            source={logos[code]}
            style={{height: 50, width: 100}}
          />
          <Text> Logo for {name} </Text>
          <Text> Username: </Text>
          <TextInput style={styles.TextInput} />
          <Text> Password: </Text>
          <TextInput style={styles.TextInput} />
          <Button
            title="login"
            onPress={() => {
              alert('logged in');
            }}
          />
          <Button
            title="change company"
            onPress={() => {
              this.props.dispatch({type: 'CHANGE_COMPANY'});
            }}
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.MyForm}>
          {!found && code != '' && <Text style={{color: 'red'}}>Error: code not found</Text>}
          <CompanyCodeForm
            onSubmit={values => {
              this.props.dispatch({type: 'SUBMIT_CODE', code: values.code.toLowerCase()});
            }}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    code: state.companySelector.code,
    found: state.companySelector.found,
    name: state.companySelector.name,
    logo: state.companySelector.logo,
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
  TextInput: {
    width: 100,
  }
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

