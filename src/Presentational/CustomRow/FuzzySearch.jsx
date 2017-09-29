import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

export default class FuzzySearch extends Component {

  static propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string,
  }

  componentWillMount() {
    this.setState({ selectedValue: "" });
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.onChange(event.target.value)
  };

  render() {
    let items = "";
    if (this.props.data) {
      items = this.props.data.map(d => {
        <option value={d}>{d}</option>
      })
    }

    return (
      <FormControl>
        <InputLabel htmlFor="fuzzy-input">this.props.label</InputLabel>
        <Select
          native
          value={this.state.selectedValue}
          onChange={this.handleChange}
          input={<Input id="fuzzy-input" />}>
          {items}
        </Select>
      </FormControl>);
  }
}