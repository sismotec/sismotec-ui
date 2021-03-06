import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import CustomRow from './CustomRow'
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Way from "../Presentational/Way";
import ReceivedTable from "../Presentational/ReceivedTable";
import '../index.css';
import SwipeableViews from 'react-swipeable-views';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class MyNeeds extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOkay = this.handleOkay.bind(this);
    this.data = {};
    this.state = {open: false};
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

  componentWillMount() {
    // const { userId, getNeeds } = this.props
    // getNeeds(userId)
    this.needs = [
      {
        id: 1,
        nombre: "Agua",
        cantidad: 3,
        unidad: "litros",
      },
      {
        id: 2,
        nombre: "Atun",
        cantidad: 100,
        unidad: "gramos",
      },
      {
        id: 3,
        nombre: "Cobijas",
        cantidad: 3,
        unidad: "unidades",
      },
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
          type: "Delete",
        }
      ]
    )
  }

  handleChange(updatedNeed, id) {
    this.data[id] = updatedNeed;
  }
  markComplete() {
    alert("Not implemented yet");
  }
  handleOkay() {
    // TODO: Implement this
    alert("Handle deletion. Not yet implemented");
    // Close it anyway
    this.setState({open: false});
  }
  handleCancel() {
    this.setState({open: false});
  }
  handleDeleteClick() {
    this.setState({open: true});
  }

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  

  render() {
    let ConfirmationDialog = this.ConfirmationDialog;
    return(
    <div className="container MyNeeds">
      <Table>
        <TableBody>
          {
            this.fields.map((n, index) => 
              <CustomRow need={n} key={index} id={index} handleChange={this.handleChange} deleteAction={this.handleDeleteClick} markComplete={this.markComplete}/>
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
      <ConfirmationDialog open={this.state.open} orc={this.handleCancel} />
    </div>)
  }
  ConfirmationDialog = (props) => {
    let open = props.open;
    return (
      <Dialog
        maxWidth="xs"
        open={open}
        onRequestClose={props.orc}
      >
        <DialogTitle>Confirmaci&oacute;n</DialogTitle>
        <DialogContent>&iquest;Est&aacute;s seguro de que quieres borrar este recurso? </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOkay} color="primary">S&iacute;</Button>
          <Button onClick={this.handleCancel} color="error">No</Button>
        </DialogActions>
      </Dialog>
    )
  }
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
