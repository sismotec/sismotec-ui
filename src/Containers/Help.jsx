import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';

class Help extends Component {
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
        Help
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

export default connect(mapStateToProps, mapDispatchToProps)(Help);