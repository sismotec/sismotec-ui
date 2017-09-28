import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class FuzzySearch extends Component {

  handleChange = event => {
    this.props.onChange(event.target.value)
  };

  render() {
    return  <TextField
          id="name"
          defaultValue={this.props.value}
          onChange={this.handleChange}
        />
  }
}