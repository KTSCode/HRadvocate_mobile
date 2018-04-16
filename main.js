import React from 'react';
var {View, Text} = require('react-native');
import CompanyCodePage from './companySelector/index';
import Login from './login/index';
import Navigation from './navigation/index';
import {COLOR, ThemeProvider} from 'react-native-material-ui';
import {connect} from 'react-redux';

const uiTheme = {
  palett: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <Navigation />
        </ThemeProvider>
      );
    } else if (this.props.companyFound) {
      return (
        <Login
          dispatch={this.props.dispatch}
          error={this.props.loginError}
          errorMessage={this.props.loginErrorMessage}
          logo={this.props.companyID}
          data={this.props.companyData}
        />
      );
    } else {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <CompanyCodePage
            dispatch={this.props.dispatch}
            error={this.props.companyNotFound}
          />
        </ThemeProvider>
      );
    }
  }
}

const mapStateToProps = state => {
  const companyNotFound = !state.company.found && state.company.code != '';
  return {
    ...state,
    companyNotFound: companyNotFound,
    companyFound: state.company.found,
    companyID: state.company.code,
    companyData: state.company.data,
    loggedIn: state.employee.loggedIn,
    loginError: state.employee.failed,
    loginErrorMessage: state.employee.message,
  };
};

export default connect(mapStateToProps)(Main);
