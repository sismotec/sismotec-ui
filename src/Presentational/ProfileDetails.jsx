import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clone } from 'ramda';

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
    this.data = [];
    this.dialogActions = null;
    this.tableHeader = null;
    this.tableFooter = null;

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
    this.data = nextProps.profile && clone(nextProps.profile.recursos.map(d => ({
      ...d,
      aportacion: d.cantidad,
    })));

    if(nextProps.user.type == "guest") {
        this.state.fields = this.data && this.data.map(d => [
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

    else if(nextProps.user.type == "collectionCenter") {
      this.state.fields = this.data && this.data.map(d => [
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
          value: d.aportacion,
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
      
      this.dialogActions = <DialogActions>
          <Button onClick={() => nextProps.handleViewLater(this.data)}>
            VER MÁS TARDE
          </Button>
          <Button onClick={() => nextProps.handleSend(this.data, this.props.profile)}>
            ENVIAR
          </Button>
        </DialogActions>;

      this.tableFooter = <TableFooter>
          <Button onClick={() => this.handleAddNeed()}>+</Button>
        </TableFooter>
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
    let newId = this.data[this.data.length-1].id + 1;
    let newNeed = {
      id: newId,
      nombre: "",
      categoria: "",
      unidad: "",
      cantidad: 0,
      aportacion: 0
    };
    this.data = [
      ...this.data,
      newNeed,
    ];
    this.props.addNeed(newNeed, this.props.profile.id);
  }

  deleteNeed(index) {
    this.props.deleteNeed(this.data[index], this.props.profile.id);

    var newFields = this.state.fields.slice(); //copy array
    newFields.splice(index, 1); //remove element
    this.setState({fields: newFields}); //update state
  }

  render() {
    const { profile = {} } = this.props;
    return (<Dialog className="dialog" open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle className="dialog-title">{profile.nombre}</DialogTitle>
          <DialogContent style={{
            overflow: 'auto'
          }}>
         <Table >
           {this.tableHeader}
          <TableBody>
            {
              this.props.profile &&
              this.state.fields.map((field, index) => <CustomRow data={this.data[index]} need={field} id={index} handleChange={this.handleChange} deleteAction={this.deleteNeed}/>)
            }
          </TableBody>
          {this.tableFooter}
        </Table>
        </DialogContent>
        {this.dialogActions}
    </Dialog>)
  }
}