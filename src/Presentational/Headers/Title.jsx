import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

export default class Title extends Component {
  render() {
    return (
      <div className="header-div">
        <img className="header-image"
          alt="logo"
          src="https://scontent.fmfe1-1.fna.fbcdn.net/v/t35.0-12/s2048x2048/22119469_10155018692621814_1617782395_o.png?oh=51e8e7cce7457ca801ec27aec66c55ef&oe=59CF1103"
        />
      </div>
    )
  }
}