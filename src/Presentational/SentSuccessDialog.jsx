import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import CheckIcon from 'material-ui-icons/Check';

export default class CollectionCenter extends Component {
  render() {
    return (
      <Dialog onRequestClose={this.props.close}>
				<DialogTitle>Gracias por su donativo</DialogTitle>
				<div>
					<Avatar> <CheckIcon /></Avatar>
				</div>
			  <Button onClick={() => console.log("Success!")}>GUARDAR ENVÍO</Button>
			</Dialog>
    )
  }
}