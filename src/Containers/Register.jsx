import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.match.params.type || 'beneficiary',
    };
  }
  static propTypes = {
    isAuth: PropTypes.bool,
    registerRequest: PropTypes.func,
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
        Register
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  registerRequest: data => dispatch(LoginActions.registerRequest(data)),
  navigateToDashboard: () => dispatch(push('/dashboard')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);