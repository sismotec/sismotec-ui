import React, { Component } from 'react';
import "../index.css";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

export default class BeneficiaryCard extends Component {
  render() {
    return (
      <div> 
        <Card>
          <CardContent>
            <Typography type="headline" component="h2">
              {this.props.name}
            </Typography>
            <Typography type="body1" component="h2">
              ¿Dónde?
            </Typography>
            <Typography type="body1">
              {this.props.address}
            </Typography>
            <Typography component="p">
              ¿Qué necesita?
            </Typography>

            <div>
              {this.props.tags.map(tag => <div>{tag}</div>)}
            </div>
          </CardContent>
          <CardActions>
            <Button color="primary">
              Default
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
