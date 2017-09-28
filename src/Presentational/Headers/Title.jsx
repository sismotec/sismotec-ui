import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

export default class Title extends Component {
  render() {
    return (
      <div className="header-div">
        <img className="header-image"
          alt="logo"
          src="https://scontent.fmfe1-1.fna.fbcdn.net/v/t35.0-12/s2048x2048/22095643_10155018911241814_1980363964_o.png?oh=f0ee42ba173397c9451d18bf41872835&oe=59CFD51E"
        />
      </div>
    )
  }
}