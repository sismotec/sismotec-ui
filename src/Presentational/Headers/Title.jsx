import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

export default class Title extends Component {
  render() {
    return (
      <div>
        <Avatar
          alt="logo"
          src="http://www.qygjxz.com/data/out/193/3856596-random-image.png"
        />
        <Typography type="title" gutterBottom>
          Échame la mano
        </Typography>
      </div>
    )
  }
}