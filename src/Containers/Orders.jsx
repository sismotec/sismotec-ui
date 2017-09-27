import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import BeneficiaryCard from "../Presentational/BeneficiaryCard";

function ViewOrdersBtn() {
    return <button>Mis ordenes</button>
}

export default class Orders extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: '823648', 
          date: '19/07/17', 
          poc: 'Juan Perez', 
          status: 'Recibido', 
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
          poc: 'Raul Jimenez', 
          status: 'No recibido',
          items: [{
            name: "Agua", qty: "150", unit: "L"
          }]
        },
        {
          id: '673244', 
          date: '11/07/17', 
          poc: 'Esteban Garza', 
          status: 'Recibido',
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
          
        <ViewOrdersBtn />

        <ReactTable
          data={data}
          columns={[
            {
              Header: "# Orden",
              accessor: "id"
            },
            {
              Header: "Fecha de creación",
              accessor: "date"
            },
            {
              Header: "Responsable",
              accessor: "poc"
            },
            {
              Header: "Status",
              accessor: "status"
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={data[0].items}
                  columns={[
                    {
                      Header: "Nombre",
                      accessor: "name"
                    },
                    {
                      Header: "Cantidad",
                      accessor: "qty"
                    },
                    {
                      Header: "Unidad",
                      accessor: "unit"
                    }
                  ]}
                  defaultPageSize={5}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
      </div>
    )
  }
}
