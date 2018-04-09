import React from 'react';
import CompanyCodePage from './companySelector/index';
import Login from './login/index';
import {Provider, connect} from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.companyNotFound = false;
  }

  companyFound() {
    this.prop.dispatch({type: 'COMPANY_FOUND'});
  }

  loggedIn() {
    this.props.dispatch({type: 'LOGGED_IN'});
  }

  render() {
    if (this.props.found) {
      return (
          <Login dispatch={this.props.dispatch} />
      );
    } else {
      return (
          <CompanyCodePage dispatch={this.props.dispatch} error={this.props.companyNotFound} />
      );
    }
  }
}

const mapStateToProps = state => {
  let companyNotFound = (!state.companySelector.found && state.companySelector.code != '')
  return {
    ...state,
    companyNotFound: companyNotFound,
    companyFound: state.root.found,
    loggedIn: state.root.login,
  };
};

export default connect(mapStateToProps)(Main);
