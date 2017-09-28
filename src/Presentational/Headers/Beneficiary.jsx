import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'

import Title from './Title';

export default class Beneficiary extends Component {
  render() {
    return (
      <AppBar position="static">
        <Title />
        <Toolbar>
          <Button onClick={() => this.props.navigateTo('/necesito')}>Necesito</Button>
          <Button onClick={() => this.props.navigateTo('/misPedidos')}>Mis Pedidos</Button>
          <Button onClick={() => this.props.navigateTo('/ayudaEnCamino')}>Ayuda En Camino</Button>
        </Toolbar>
      </AppBar>
    )
  }
}