import React, { Component } from 'react';
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

export default class LoginView extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.closeLogin}>
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
                    defaultValue={this.props.username}
                    onChange={() => this.props.handleChange}/>
            </div>
            <div>
                <TextField
                    name='password'
                    ref='password'
                    label='Contraseña'
                    id='password'
                    type='password'
                    placeholder='*********'
                    defaultValue={this.props.password}
                    onChange={() => this.props.handleChange}/>
            </div>
            <br></br>
            <div>
                <Button
                    raised
                    type='submit'
                    onSubmit={() => this.props.handleSubmit}>
                Entrar
                </Button>
            </div>
            <br></br>
            <div>
                ¿Aún no tienes cuenta?
                <br></br>
                ¡Registrate!
                <div>
                    <Button
                        raised
                        type='submit'
                        onSubmit={() => this.props.handleAyuda}>
                        Ayuda
                    </Button>
                </div>
                <br></br>
                <div>
                    <Button
                        raised
                        type='submit'
                        onSubmit={() => this.props.handleAcopio}>
                        Soy un centro de acopio
                    </Button>
                </div>
            </div>
        </form>
    </Dialog>
    )
  }
}