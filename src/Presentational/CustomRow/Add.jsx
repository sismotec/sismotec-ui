import React, {Component} from 'react';

export default class Add extends Component {
  render() {
    return <button onClick={this.props.onClick}>Add</button>
  }
}