import React, {Component} from 'react';

export default class Delete extends Component {
  render() {
    return <button className="delete-button" onClick={this.props.onClick}>X</button>
  }
}