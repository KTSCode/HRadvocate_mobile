import React from 'react';
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
        <Navigation
          screenProps={{
            dispatch: this.props.dispatch,
            company: this.props.company,
            employee: this.props.employee,
          }}
        />
      );
    } else if (this.props.companyFound) {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <Login
            dispatch={this.props.dispatch}
            error={this.props.loginError}
            errorMessage={this.props.loginErrorMessage}
            logo={this.props.companyID}
            remember={this.props.loginRemember}
            data={this.props.companyData}
          />
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <CompanyCodePage
            dispatch={this.props.dispatch}
            error={this.props.companyNotFound}
            invalid={this.props.companyCodeInvalid}
            info={this.props.companyCodeInfo}
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
    companyCodeInfo: state.company.info,
    companyCodeInvalid: state.company.invalid,
    companyID: state.company.code,
    companyData: state.company.data,
    loggedIn: state.employee.loggedIn,
    loginError: state.employee.failed,
    loginErrorMessage: state.employee.message,
    loginRemember: {
      remember: state.employee.remember,
      username: state.employee.username,
      password: state.employee.password,
    },
  };
};

export default connect(mapStateToProps)(Main);
