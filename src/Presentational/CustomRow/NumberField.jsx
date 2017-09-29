import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class NumberField extends Component {

  handleChange = event => {
    this.props.onChange(Number(event.target.value))
  };

  render() {
    return  <TextField
          id="name"
          type="number"
          min="0"
          defaultValue={this.props.value}
          onChange={this.handleChange}
        />
  }
}