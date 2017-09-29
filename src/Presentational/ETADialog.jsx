import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TimePicker from './CustomRow/TimePicker'

export default class ETADialog extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.close}>
				<DialogTitle>Tiempo Estimado de Arrivo</DialogTitle>
        <div style={{textAlign: 'center'}}>
					<TimePicker onChange={(value) => this.props.changeETA(value)}/>
				</div>
				<Button onClick={() => this.props.submitETA()}>Continuar</Button>
			</Dialog>
    )
  }
}
