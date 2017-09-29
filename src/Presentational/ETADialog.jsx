import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';

import TimePicker from 'CustomRow/TimePicker'

export default class CollectionCenter extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.close}>
				<DialogTitle>Tiempo Estimado de Arrivo</DialogTitle>
        <div>
					<TimePicker onChange={(value) => this.props.changeETA(value)}/>
				</div>
				<Button onClick={() => this.props.submitETA}>Continuar</Button>
			</Dialog>
    )
  }
}