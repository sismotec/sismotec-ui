import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'
import '../../index.css';
import Title from './Title';
import Colors from 'material-ui/colors';

export default class Guest extends Component {
  render() {
    return (
      <AppBar position="static" className="header-color">
        <Title />
        <Toolbar className="header-div">
          <Button flat className="header-button" onClick={this.props.openBeneficiary}>Ayuda</Button>
          <Button flat className="header-button" onClick={this.props.openCenter}>Soy Centro de Acopio</Button>
          <Button flat className="header-button" onClick={this.props.openLogin}>Entrar a mi cuenta</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
