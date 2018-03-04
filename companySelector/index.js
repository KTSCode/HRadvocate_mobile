import React from 'react';
var {
  StyleSheet,
  ListView,
  View,
  Text,
  ActivityIndicator,
} = require('react-native');

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from './actions'; //Import your actions

class companySelector extends React.Component {
  //XXX why use a constructor?
  constructor(props) {
    super(props);
    
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds,
    };
  }
  componentDidMount() {
    this.props.getCompanyData('abc'); //call our action
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            size="small"
          />
        </View>
      );
    } else {
      return (
        <View style={{}}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.ds.cloneWithRows(this.props.data)}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {parseInt(rowID) + 1}
          {'. '}
          {rowData.title}
        </Text>
        <Text style={styles.description}>{rowData.description}</Text>
      </View>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    loading: state.dataReducer.loading,
    data: state.dataReducer.data,
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(companySelector);

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
