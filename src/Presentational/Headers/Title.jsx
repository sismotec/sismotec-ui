import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';

export default class Title extends Component {
  render() {
    return (
      <div>
        <Avatar
        alt="logo"
        src="http://www.qygjxz.com/data/out/193/3856596-random-image.png"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
        <Typography type="title" gutterBottom>
          Échame la mano
        </Typography>
      </div>
    )
  }
}