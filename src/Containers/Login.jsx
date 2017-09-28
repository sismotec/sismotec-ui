import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

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
        console.log(this.state);
        event.preventDefault();
        this.props.loginRequest({
            responsibleEmail: this.state.username,
            password: this.state.password
        })
    }

    handleAyuda(event) {
        alert('Ayuda');
        event.preventDefault();
    }

    handleAcopio(event) {
        alert('Centro de Acopio');
        event.preventDefault();
    }
  
  render() {
    return (
        <div>
            <Dialog open>
                <DialogTitle>Login</DialogTitle>
                <form>
                    <div>
                        <TextField
                            name='username'
                            ref='username'
                            type='text'
                            label='Correo'
                            id='username'
                            placeholder='semanai@itesm.mx'
                            autoCorrect='off'
                            autoCapitalize='off'
                            spellCheck='false'
                            defaultValue={this.state.username}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <TextField
                            name='password'
                            ref='password'
                            label='Contraseña'
                            id='password'
                            type='password'
                            placeholder='*********'
                            defaultValue={this.state.password}
                            onChange={this.handleChange}/>
                    </div>
                    <br></br>
                    <div>
                        <Button
                            raised
                            type='submit'
                            onSubmit={this.handleSubmit}>
                        Entrar
                        </Button>
                    </div>
                    <br></br>
                    <div>
                        <h2>¿Aún no tienes cuenta?</h2>
                        <h2>¡Registrate!</h2>
                        <div>
                            <Button
                                raised
                                type='submit'
                                onSubmit={this.handleAyuda}>
                                Ayuda
                            </Button>
                        </div>
                        <br></br>
                        <div>
                            <Button
                                raised
                                type='submit'
                                onSubmit={this.handleAcopio}>
                                Soy un centro de acopio
                            </Button>
                        </div>
                    </div>
                </form>
            </Dialog>
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