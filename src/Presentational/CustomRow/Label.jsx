import React, {Component} from 'react';

export default class Label extends Component {
  render() {
    return  <div>
      {this.props.value}
    </div>
  }
}