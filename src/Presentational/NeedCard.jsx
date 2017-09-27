import React, { Component } from 'react';
import "../index.css";

const Tag = ({tags}) => (
  <div>
    {tags.map(tag => (
      <div>{tag}</div>
    ))}
  </div>
);

export default class NeedCard extends Component {
  render() {
    return (
      <div className="needCard"> 
        <label className="needCard title">{this.props.name}</label>
        <label className="needCard content">¿Dónde?</label>
        <label className="needCard content">
          <a href="{this.props.mapsurl}">{this.props.address}</a>
        </label>
        <label className="needCard content">¿Qué necesita?</label>

        <Tag tags={["Alimentos", "Medicamentos", "Voluntarios"]} />

        <button className="needCard btn">Detalles</button>
      </div>
    )
  }
}
