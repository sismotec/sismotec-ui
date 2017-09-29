import React, { Component } from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar'

import Title from './Title';

export default class Status extends Component{
    render(){
        return(
            <AppBar position ="static">
                <Title />
                <Toolbar>
                    <Button onClick = {() => this.props.openActivos()}>Activos</Button>
                    <Button onClick = {() => this.props.openEnCamino()}>En Camino</Button>
                    <Button onClick = {() => this.props.openRecibidos()}>Recibidos</Button>
                </Toolbar>
         </AppBar>

        )
    }
}