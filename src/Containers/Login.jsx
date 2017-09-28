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

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAyuda = this.handleAyuda.bind(this);
      this.handleAcopio = this.handleAcopio.bind(this);
    }

    handleChange(event) {
      const targetName = event.target.name;

      let newstate = {
            username: this.state.username,
            password: this.state.password
        };

      newstate[targetName]=event.target.value;
      this.setState(newstate);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.loginRequest({
            responsibleEmail: this.state.username,
            password: this.state.password
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
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} 
            handleAcopio={this.handleAcopio} 
            handleAyuda={this.handleAyuda}
            username={this.state.username}
            password={this.state.password}
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