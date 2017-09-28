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
      <Dialog className="dialog" open={this.props.open} onRequestClose={this.props.closeLogin}>
        <DialogTitle className="dialog-title">ENTRAR A MI CUENTA</DialogTitle>
        <form>
            <div>
                <TextField 
                    className="dialog-textfield"
                    name='username'
                    ref='username'
                    type='text'
                    label='Correo'
                    id='username'
                    autoCorrect='off'
                    autoCapitalize='off'
                    spellCheck='false'
                    defaultValue={this.props.username}
                    onChange={() => this.props.handleChange}
                    type="email"/>
            </div>
            <div>
                <TextField
                    className="dialog-textfield"
                    name='password'
                    ref='password'
                    label='Contraseña'
                    id='password'
                    type='password'
                    defaultValue={this.props.password}
                    onChange={() => this.props.handleChange}/>
            </div>
            <br></br>
            <div>
                <Button
                    className="dialog-button"
                    raised
                    type='submit'
                    color="primary"
                    onSubmit={() => this.props.handleSubmit}>
                ENTRAR
                </Button>
            </div>
            <br></br>
            <div>
                <p className="p-caption"> ¿Aún no tienes cuenta? </p>
                <div>
                    <Button
                        className="dialog-button"
                        raised
                        type='submit'
                        color="primary"
                        onSubmit={() => this.props.handleAyuda}>
                        SOLICITAR AYUDA
                    </Button>
                    <br></br>
                    <Button
                        className="dialog-button"
                        raised
                        type='submit'
                        color="primary"
                        onSubmit={() => this.props.handleAcopio}>
                        SOY CENTRO DE ACOPIO
                    </Button>
                </div>
            </div>
        </form>
    </Dialog>
    )
  }
}