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

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as reducers from './reducer';
import * as Actions from './actions'; //Import your actions
import Data from './companies.json';

class companySelector extends React.Component {
  state = {};

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(Actions.fetchCompaniesSuccess(Data));
  }

  onPress = () => {
    const {dispatch} = this.props;
    dispatch(Actions.setActiveCompany(this.state.text));
  }

  onChangeText = (text) => {
    this.setState({
      text
    })
  }

  render() {
    const {company} = this.props
    return (
      <View style={styles.activityIndicatorContainer}>
        {company && <Text> {company.name}</Text>}
        {!company && (
          <View>
            <TextInput onChangeText={this.onChangeText} />
            <Button title='Submit' onPress={this.onPress}/>
          </View>
        )}
      </View>
    );
  }

function mapStateToProps(state, props) {
  let activeCompany = reducers.getActiveCompany(state)
  return {
    company: reducers.getCompany(state, activeCompany),
  };
}

//Connect everything
export default connect(mapStateToProps)(companySelector);

var styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // height: 50,
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },

  description: {
    marginTop: 5,
    fontSize: 14,
  },
});
