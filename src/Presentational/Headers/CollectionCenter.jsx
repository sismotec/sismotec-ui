import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'

import Title from './Title';

export default class CollectionCenter extends Component {
  render() {
    return (
      <AppBar position="static">
        <Title />
        <Toolbar>
          <Button onClick={() => this.props.navigateTo('/tengo')}>Tengo</Button>
          <Button onClick={() => this.props.clickedHelp('/pinned')}>Pinned</Button>
          <Button onClick={() => this.props.clickedHelp('/sent')}>Sent</Button>
          <Button onClick={() => this.props.clickedHelp('/necesito')}>Necesito</Button>
          <Button onClick={() => this.props.clickedHelp('/pedidos')}>Mis pedidos</Button>
          <Button onClick={() => this.props.clickedHelp('/ayudaEnCamino')}>Ayuda en camino</Button>
        </Toolbar>
      </AppBar>
    )
  }
}