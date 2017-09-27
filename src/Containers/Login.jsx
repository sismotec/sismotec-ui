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
        username: 'benis',
        password: 'benis'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
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
        console.log(this.state);
        event.preventDefault();
        this.props.loginRequest({
            responsibleEmail: this.state.username,
            password: this.state.password
        })
    }

    handleCreate(event) {
        alert('Create new account');
        event.preventDefault();
    }
  
  render() {
    return (
        <div>
            <h1>Entrar a mi cuenta</h1>
            <form>
                <div>
                    <h2>Correo electrónico</h2>
                    <input
                        name='username'
                        ref='username'
                        type='text'
                        label='Username'
                        id='username'
                        placeholder='semanai@itesm.mx'
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck='false'
                        defaultValue={this.state.username}
                        onChange={this.handleChange}/>
                </div>
                <div>
                    <h2>Contraseña</h2>
                    <input
                        name='password'
                        ref='password'
                        label='Password'
                        id='password'
                        type='password'
                        placeholder='*********'
                        defaultValue={this.state.password}
                        onChange={this.handleChange}/>
                </div>
                <div>
                    <br></br>
                    <button
                        type='submit'
                        onSubmit={this.handleSubmit}>
                    Entrar
                    </button>
                </div>
                <div>
                    <h2>¿Aún no tienes cuenta?</h2>
                    <button
                        type='submit'
                        onSubmit={this.handleCreate}>
                        Crear una cuenta
                    </button>
                </div>
            </form>
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