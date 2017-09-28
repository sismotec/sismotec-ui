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
          <Button onClick={() => this.props.clickedHelp('/donaciones')}>Pinned</Button>
          <Button onClick={() => this.props.clickedHelp('/necesito')}>Necesito</Button>
          <Button onClick={() => this.props.clickedHelp('/misPedidos')}>Mis pedidos</Button>
        </Toolbar>
      </AppBar>
    )
  }
}