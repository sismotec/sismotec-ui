import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'

import Title from './Title';

export default class Guest extends Component {
  render() {
    return (
      <AppBar position="static">
        <Title />
        <Toolbar>
          <Button>Ayuda</Button>
          <Button>Soy Centro de Acopio</Button>
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    )
  }
}