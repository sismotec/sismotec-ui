import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';

class Login extends Component {
  static propTypes = {
    isAuth: PropTypes.bool,
    loginRequest: PropTypes.func,
    navigateToDashboard: PropTypes.func,
  }

  componentWillMount() {
    // Redirect to dashboard
    if(this.props.isAuth) {
      this.props.navigateToDashboard();
    }    
  }
  

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuth) {
      // Redirect to dashboard
      this.props.navigateToDashboard();
    }    
  }
  
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(LoginActions.loginRequest(data)),
  navigateToDashboard: () => dispatch(push('/dashboard')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);