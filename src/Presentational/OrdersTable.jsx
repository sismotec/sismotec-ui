import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const senderCols = [
  {
    Header: "# Orden",
    accessor: "id"
  },
  {
    Header: "Fecha de creación",
    accessor: "date"
  },
  {
    Header: "Destino",
    accessor: "destination"
  },
  {
    Header: "Status",
    accessor: "status"
  },
  {
    Header: "Imprimir",
    accessor: "pdf"
  }
];

const receiverCols = [
  {
    Header: "# Orden",
    accessor: "id"
  },
  {
    Header: "Fecha de creación",
    accessor: "date"
  },
  {
    Header: "Origen",
    accessor: "origin"
  },
  {
    Header: "Estado",
    accessor: "status"
  },
  {
    Header: "",
    accessor: "check"
  }
];

export default class OrdersTable extends Component {
  render() {
    return <ReactTable
          data={this.props.data}
          columns={this.props.type === "SENDER" ? senderCols : receiverCols}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={this.props.data[0].items}
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
  }
}