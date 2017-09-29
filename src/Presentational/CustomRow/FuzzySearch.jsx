import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

export default class FuzzySearch extends Component {

  handleChange = event => {
    this.props.onChange(event.target.value)
  };

  render() {
    let items = "";
    if (this.props.data) {
      items = this.props.data.map(d => {
        <MenuItem value={d.value}>{d.value}</MenuItem>
      })
    }

    return (
      <FormControl>
        <InputLabel htmlFor="age-helper">Age</InputLabel>
        <Select
          native
          value={this.props.value}
          onChange={this.handleChange}
          input={<Input id="fuzzy-input" />}>
          {items}
        </Select>
      </FormControl>);
  }
}