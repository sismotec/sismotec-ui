import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'
import '../../index.css';
import Title from './Title';

export default class Guest extends Component {
  render() {
    return (
      <AppBar position="static" className="header-color">
        <Title/>
        <Toolbar className="header-div">
<<<<<<< HEAD
          <Button flat className="header-button" color="contrast" onClick={() => this.props.openBeneficiary()}>Solicitar ayuda</Button>
          <Button flat className="header-button" color="contrast" onClick={() => this.props.openCenter()}>Soy centro de acopio</Button>
          <Button flat className="header-button" color="contrast" onClick={() => this.props.openLogin()}>Entrar a mi cuenta</Button>
=======
          <Button flat className="header-button" color="contrast" onClick={this.props.openBeneficiary}>Solicitar ayuda</Button>
          <Button flat className="header-button" color="contrast" onClick={this.props.openCenter}>Soy centro de acopio</Button>
          <Button flat className="header-button" color="contrast" onClick={this.props.openLogin}>Entrar a mi cuenta</Button>
>>>>>>> 6dbaba739a69c06c5740ce2c8771cae773ec523a
        </Toolbar>
      </AppBar>
    )
  }
}
