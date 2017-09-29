import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, { TableBody } from 'material-ui/Table';
// import { push } from 'react-router-redux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import CustomRow from './CustomRow'
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import '../index.css';

class MyNeeds extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.deleteNeed = this.deleteNeed.bind(this);
    this.data = {};
  }
  static propTypes = {
    needs: PropTypes.array,
    getNeeds: PropTypes.func,
    createNeed: PropTypes.func,
    updateNeeds: PropTypes.func,
  }

  static defaultProps = {
    needs: [],
  }

  deleteNeed(index) {
    //this.props.deleteNeed(this.data[index].id);
  }

  componentWillMount() {
    // const { userId, getNeeds } = this.props
    // getNeeds(userId)
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

    this.fields = this.data.map(d => [
        {
          type: "Label",
          value: d.nombre,
          key: "nombre"
        },
        {
          type: "NumberField",
          value: d.cantidad,
          key: "cantidad"
        },
        {
          type: "FuzzySearch",
          value: d.unidad,
          options: [d.unidad],
          key: "unidad"
        },
        {
          type: "Button",
          label: 'Mark complete',
          onClick: 'markComplete',
          key: "btn",
          props: {
            raised: true,
            color: "primary"
          }
        },
        {
          type: "Delete",
        }
      ]
    )
  }

  // componentWillReceiveProps(nextProps, oldProps) {
  //   if(nextProps.length && (!oldProps || oldProps.length )) {
  //     this.data = nextProps.needs;
  //     this.fields = this.data.map(d => [
  //         {
  //           type: "Label",
  //           value: d.nombre,
  //           key: "nombre"
  //         },
  //         {
  //           type: "Quantity",
  //           value: d.cantidad,
  //           key: "cantidad"
  //         },
  //         {
  //           type: "FuzzySearch",
  //           value: d.unidad,
  //           options: [d.unidad],
  //           key: "unidad"
  //         },
  //         {
  //           type: "Delete",
  //           delete: (index) => this.props.deleteNeed(this.data[index].id)
  //         }
  //       ]
  //     )
  //   }
  // }

  handleChange(updatedNeed, id) {
    this.data[id] = updatedNeed;
  }
  markComplete() {
    alert("Not implemented yet");
  }
  
  render() {
    return(
    <div className="container MyNeeds">
      <h1>Mis necesidades</h1>
      <div className="tabcontainer" style={{marginBottom:40}}>
        <Tabs value={0} indicatorColor="primary" textColor="primary" fullWidth>
          <Tab label="Activas"></Tab>
          <Tab label="En camino"></Tab>
          <Tab label="Recibidas"></Tab>
        </Tabs>
        <hr/>
      </div>
      <Table>
        <TableBody>
          {
            this.fields.map((n, index) => 
              <CustomRow need={n} key={index} id={index} handleChange={this.handleChange} deleteAction={this.deleteNeed} markComplete={this.markComplete}/>
            )
          }
        </TableBody>
      </Table>
      <Button 
        className="table-button"
        raised
        color="primary"
        onClick={() => this.props.updateNeeds(this.props.userId, this.data)}>Guardar cambios
      </Button>
    </div>)
  }
}

const confirmationDialog() {
  return (
    <Dialog
      ignoreBackdropClick
      ignoreEscapeKeyUp
      maxWidth="xs"
    >
      <DialogTitle>Confirmaci&oacute;n</DialogTitle>
      <DialogContent> Est&aacute;s seguro de que quieres borrar este recurso? </DialogContent>
      <DialogActions>
        <Button color="primary">S&iacute;</Button>
        <Button color="error">No</Button>
      </DialogActions>
    </Dialog>
  )
}
const mapStateToProps = state => ({
  userId: state.user.userId,
  needs: state.needs.get.results,
});

const mapDispatchToProps = dispatch => ({
  getNeeds: id => dispatch(NeedsActions.getRequest(id)),
  createNeed: data => dispatch(NeedsActions.createRequest(data)),
  updateNeeds: (id, data) => dispatch(NeedsActions.updateRequest(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyNeeds)
