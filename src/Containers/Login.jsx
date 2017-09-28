import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';
import LoginView from '../Presentational/LoginView'

class Login extends Component {
  static propTypes = {
    isAuth: PropTypes.bool,
    loginRequest: PropTypes.func,
    navigateToDashboard: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAyuda = this.handleAyuda.bind(this);
    this.handleAcopio = this.handleAcopio.bind(this);
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

  handleSubmit(username, password) {
    this.props.loginRequest({
        responsibleEmail: username,
        password: password
    })
  }

  handleAyuda(event) {
      alert('Create new account');
      event.preventDefault();
      alert('Create new account');
  }

  handleAcopio(event) {
      alert('Create new account');
      event.preventDefault();
      alert('Create new account');
  }
  
  render() {
    return (
        <LoginView 
            handleSubmit={this.handleSubmit} 
            handleAcopio={this.handleAcopio} 
            handleAyuda={this.handleAyuda}
            open={this.props.open}
            closeLogin={this.props.closeLogin}/>
    )
  }

}

const mapStateToProps = state => ({
  isAuth: !!state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(LoginActions.loginRequest(data)),
  navigateToDashboard: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);