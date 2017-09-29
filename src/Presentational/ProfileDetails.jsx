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
import Table, {TableBody} from 'material-ui/Table';

import CustomRow from '../Containers/CustomRow';


export default class CollapsedDetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.data = {};
    this.fields =[];
    this.dialogActions = null;
  }
  static propTypes = {
    needs: PropTypes.array,
    getNeeds: PropTypes.func,
  }

  static defaultProps = {
    needs: [],
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
        this.fields = this.data.map(d => [
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
    }

    else if(this.props.user.type == "collectionCenter") {
      this.fields = this.data.map(d => [
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
      ]
    )
    }
  }

  handleChange(updatedNeed, id) {
    this.data[id] = updatedNeed;
  }

  render() {
    const { profile = {} } = this.props;
    return <Dialog className="dialog" open={this.props.open} onRequestClose={this.props.close}>
        <DialogTitle className="dialog-title">{profile.nombre}</DialogTitle>
         <Table >
          <TableBody>
            {
              this.fields.map((field, index) => <CustomRow need={field} id={index} handleChange={this.handleChange}/>)
            }
          </TableBody>
        </Table>
        {this.dialogActions}
    </Dialog>
  }
}