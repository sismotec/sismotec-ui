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
        <Title/>
        <Toolbar className="header-div">
          <Button className="header-button" color="contrast" onClick={this.props.openBeneficiary}>Solicitar ayuda</Button>
          <Button className="header-button" color="contrast" onClick={this.props.openCenter}>Soy centro de acopio</Button>
          <Button className="header-button" color="contrast" onClick={this.props.openLogin}>Entrar a mi cuenta</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
