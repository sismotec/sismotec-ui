import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const targetName = event.target.name;

    let newstate = {
        username: this.state.username,
        password: this.state.password
    };

    newstate[targetName] = event.target.value;
    this.setState(newstate);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.handleSubmit(username, password);
  }

  render() {
    return (
      <Dialog className="dialog" open={this.props.open} onRequestClose={this.props.closeLogin}>
        <DialogTitle className="dialog-title">ENTRAR A MI CUENTA</DialogTitle>
        <form>
          <div>
            <TextField
              className="dialog-textfield"
              name='username'
              ref='username'
              label='Correo'
              id='username'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck='false'
              onChange={this.handleChange}
              type="email" />
          </div>
          <div>
            <TextField
              className="dialog-textfield"
              name='password'
              ref='password'
              label='Contraseña'
              id='password'
              type='password'
              onChange={this.handleChange} />
          </div>
          <br></br>
          <div>
            <Button
              className="dialog-button"
              raised
              type='submit'
              color="primary"
              onClick={this.handleSubmit}
              // onSubmit={this.handleSubmit}>
              >
              ENTRAR
            </Button>
          </div>
          <br></br>
          <Divider light />
          <div>
            <p className="p-caption"> ¿Aún no tienes cuenta?</p>
            <p className="p-subcaption"> Regístrate como:</p>
            <div>
              <Button
                className="dialog-button"
                raised
                type='submit'
                color="primary"
                onSubmit={() => this.props.handleAyuda}>
                Beneficiario
                    </Button>
              <br></br>
              <Button
                className="dialog-button"
                raised
                type='submit'
                color="primary"
                onSubmit={() => this.props.handleAcopio}>
                Centro de acopio            
                    </Button>
            </div>
          </div>
        </form>
      </Dialog>
    )
  }
}