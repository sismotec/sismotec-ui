import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'

import Title from './Title';

export default class CollectionCenter extends Component {
  render() {
    return (
      <AppBar position="static" className="header-color">
        <Title />
        <Toolbar className="header-div">
          <Button flat className="header-button" onClick={() => this.props.navigateTo('/tengo')}>Tengo</Button>
          <Button flat className="header-button" onClick={() => this.props.navigateTo('/donaciones')}>Donaciones</Button>
          <Button flat className="header-button" onClick={() => this.props.navigateTo('/necesito')}>Necesito</Button>
          <Button flat className="header-button" onClick={() => this.props.navigateTo('/pedidos')}>Mis pedidos</Button>
        </Toolbar>
      </AppBar>
    )
  }
}