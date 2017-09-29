import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Table, {TableBody, TableFooter, TableCell, TableHead, TableRow} from 'material-ui/Table';

import CustomRow from '../Containers/CustomRow';


export default class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddNeed = this.handleAddNeed.bind(this);
    this.deleteNeed = this.deleteNeed.bind(this);
    this.data = {};
    this.dialogActions = null;
    this.tableHeader = null;

    this.state = {
      field: []
    }
  }
  static propTypes = {
    needs: PropTypes.array,
    getNeeds: PropTypes.func,
  }

  static defaultProps = {
    needs: [],
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user.type == "collectionCenter") {
      this.dialogActions = <DialogActions>
          <Button onClick={() => this.props.handleViewLater(this.data)}>
            VER MÁS TARDE
          </Button>
          <Button onClick={() => this.props.handleSend(this.data)}>
            ENVIAR
          </Button>
        </DialogActions>
    }

    this.needs = [
      {
        id: 1,
        nombre: "agua",
        cantidad: 3,
        unidad: "litros",
      },
      {
        id: 2,
        nombre: "atun",
        cantidad: 100,
        unidad: "gramos",
      },
      {
        id: 3,
        nombre: "cobijas",
        cantidad: 3,
        unidad: "cobijas",
      }
    ];

    this.data = this.needs;

    if(this.props.user.type == "guest") {
        this.state.fields = this.data.map(d => [
          {
            type: "Label",
            value: d.nombre,
            key: "nombre"
          },
          {
            type: "Label",
            value: d.cantidad,
            key: "cantidad"
          },
          {
            type: "Label",
            value: d.unidad,
            key: "unidad"
          }
        ]
      )

      this.tableHeader = <TableHead>
          <TableRow>
            <TableCell>Recurso</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad</TableCell>
          </TableRow>
        </TableHead>;
    }

    else if(this.props.user.type == "collectionCenter") {
      this.state.fields = this.data.map(d => [
        {
          type: "Label",
          value: d.nombre,
          key: "nombre"
        },
        {
          type: "Label",
          value: d.cantidad,
          key: "cantidad"
        },
        {
          type: "Label",
          value: d.unidad,
          key: "unidad"
        },
        {
          type: "NumberField",
          value: 0,
          key: "aportacion"
        },
      ]);

      this.tableHeader = <TableHead>
          <TableRow>
            <TableCell>Recurso</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad</TableCell>
            <TableCell>Aportación</TableCell>
          </TableRow>
        </TableHead>;
    }
  }

  componentWillMount() {
    if(this.props.user.type == "collectionCenter") {
      this.dialogActions = <DialogActions>
          <Button onClick={() => this.props.handleViewLater(this.data)}>
            VER MÁS TARDE
          </Button>
          <Button onClick={() => this.props.handleSend(this.data)}>
            ENVIAR
          </Button>
        </DialogActions>
    }

    this.needs = [
      {
        id: 1,
        nombre: "agua",
        cantidad: 3,
        unidad: "litros",
      },
      {
        id: 2,
        nombre: "atun",
        cantidad: 100,
        unidad: "gramos",
      },
      {
        id: 3,
        nombre: "cobijas",
        cantidad: 3,
        unidad: "cobijas",
      }
    ];

    this.data = this.needs;

    if(this.props.user.type == "guest") {
        this.state.fields = this.data.map(d => [
          {
            type: "Label",
            value: d.nombre,
            key: "nombre"
          },
          {
            type: "Label",
            value: d.cantidad,
            key: "cantidad"
          },
          {
            type: "Label",
            value: d.unidad,
            key: "unidad"
          }
        ]
      )

      this.tableHeader = <TableHead>
          <TableRow>
            <TableCell>Recurso</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad</TableCell>
          </TableRow>
        </TableHead>;
    }

    else if(this.props.user.type == "collectionCenter") {
      this.state.fields = this.data.map(d => [
        {
          type: "Label",
          value: d.nombre,
          key: "nombre"
        },
        {
          type: "Label",
          value: d.cantidad,
          key: "cantidad"
        },
        {
          type: "Label",
          value: d.unidad,
          key: "unidad"
        },
        {
          type: "NumberField",
          value: 0,
          key: "aportacion"
        },
      ]);

      this.tableHeader = <TableHead>
          <TableRow>
            <TableCell>Recurso</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad</TableCell>
            <TableCell>Aportación</TableCell>
          </TableRow>
        </TableHead>;
    }
  }

  handleChange(updatedNeed, id) {
    this.data[id] = updatedNeed;
  }

  handleAddNeed() {
    this.setState({
      fields: [
          ...this.state.fields,
          [
            {
                type: "FuzzySearch",
                value: "Busque recurso",
                key: "nombre"
              },
              {
                type: "Label",
                value: 0,
                key: "cantidad"
              },
              {
                type: "Label",
                value: "",
                key: "unidad"
              },
              {
                type: "NumberField",
                value: 0,
                key: "aportacion"
              },
              {
                type: "Delete"
              },
        ]
      ]
    });
  }

  deleteNeed(index) {
    //this.props.deleteNeed(this.data[index].id);
  }

  render() {
    return (<Dialog className="dialog" open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle className="dialog-title">{this.props.profile.nombre}</DialogTitle>
        <DialogContent style={{
          overflow: 'auto'
        }}>
         <Table >
           {this.tableHeader}
          <TableBody>
            {
              this.state.fields.map((field, index) => <CustomRow need={field} id={index} handleChange={this.handleChange} deleteAction={this.deleteNeed}/>)
            }
          </TableBody>
          <TableFooter>
            <Button onClick={() => this.handleAddNeed()}>+</Button>
          </TableFooter>
        </Table>
        </DialogContent>
        {this.dialogActions}
    </Dialog>)
  }
}