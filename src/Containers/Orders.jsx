import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import BeneficiaryCard from "../Presentational/BeneficiaryCard";
import EnhancedTable from "../Presentational/OrdersTable";

export default class Orders extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: '823648',
          date: '19/07/17', 
          status: 'Recibido',
          origin: "Tec de Monterrey",
          destination: "Luis Miguel",
          pdf: "PDF",
          check: "Marcar recibido",
          items: [{
            name: "Agua", qty: "150", unit: "litros"
          },
          {
            name: "Atún", qty: "300", unit: "latas"
          }]
        },
        {
          id: '213245', 
          date: '22/07/17', 
          status: 'No recibido',
          origin: "Centro de acopio San Juan Bosco",
          destination: "Jimena Garza",
          pdf: "PDF",
          check: "Marcar recibido",
          items: [{
            name: "Agua", qty: "150", unit: "L"
          }]
        },
        {
          id: '673244', 
          date: '11/07/17',  
          status: 'Recibido',
          origin: "Centro de acopio San Juan Bosco",
          destination: "Esteba Garza",
          pdf: "PDF",
          check: "Marcar recibido",
          items: [{
            name: "Agua", qty: "150", unit: "L"
          }]
        }
      ],

    };
  }
  render() {
    const { data } = this.state;

    return (
      <div>
        <BeneficiaryCard 
          name="Gaby Paez"
          mapsurl="http://maps.google.com"
          address="Valle de la Esperanza 543 Col. Roma, Monterrey, Nuevo León, México."
          tags={["Alimentos", "Medicamentos", "Voluntariados"]}/>

        <br></br>

        <EnhancedTable type="SENDER" data={data} />
        
      </div>
    )
  }
}
