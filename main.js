import React from 'react';
var {View, Text} = require('react-native');
import CompanyCodePage from './companySelector/index';
import Login from './login/index';
import {connect} from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
    //this.companyNotFound = false;
  }

  render() {
    if (this.props.loggedIn) {
      //FIXME find the correct place for this
      //this.props.dispatch({type: 'LOGGED_IN'});
      return (
        <View>
          <Text>main app</Text>
        </View>
      );
    } else if (this.props.companyFound) {
      //FIXME find the correct place for this
      //this.props.dispatch({type: 'COMPANY_FOUND'});
      return <Login dispatch={this.props.dispatch} error={'none'} />;
    } else {
      return (
        <CompanyCodePage
          dispatch={this.props.dispatch}
          error={this.props.companyNotFound}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  let companyNotFound =
    !state.companySelector.found && state.companySelector.code != '';
  return {
    ...state,
    companyNotFound: companyNotFound,
    companyFound: state.companySelector.found,
    loggedIn: state.root.login,
  };
};

export default connect(mapStateToProps)(Main);
