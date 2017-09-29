import React, { Component } from 'react';
import "../index.css";

import Card, { CardActions, CardContent } from 'material-ui/Card';
import {GridListTile} from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const Tag = ({tags}) => (
  <div>
    {tags.map(tag => (
      <div>{tag}</div>
    ))}
  </div>
);

export default class ProfileCard extends Component {
  render() {
    const {profile} = this.props;   
    console.log(profile); 
    return (
      <Card>
        <CardContent>
          <Typography className="needCard-beneficiary" type="headline" >
            {profile.nombre_propietario}
          </Typography>
          <Typography className="needCard-location" component="p">
            {profile.latitud}, {profile.longitud} <br />
          </Typography>
          <Typography className="needCard-needs" component="p">
            Recursos <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button className="needCard-button" onClick={() => this.props.openProfileDetails(profile.id_propietario)}>Ver detalles</Button>
        </CardActions>
      </Card>)
      /*<div className="needCard"> 
        <label className="needCard title">{this.props.name}</label>
        <label className="needCard content">¿Dónde?</label>
        <label className="needCard content">
            <a href="{this.props.mapsurl}">{this.props.address}</a>
          </label>
        <label className="needCard content">¿Qué necesita?</label>

        <Tag tags={["Alimentos", "Medicamentos", "Voluntarios"]} />

        <button className="needCard btn">Detalles</button>
      </div>*/
  }
}
