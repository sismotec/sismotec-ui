import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
// import { push } from 'react-router-redux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import CustomRow from './CustomRow'

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
  
  render() {
    console.log(this.needs);
    return <div>
    <Table >
        <TableBody>
          {
            this.fields.map((n, index) => <CustomRow need={n} id={index} handleChange={this.handleChange} deleteAction={this.deleteNeed}/>)
          }
        </TableBody>
      </Table>
      <button onClick={() => this.props.updateNeeds(this.props.userId, this.data)}>Guardar cambios</button>
      </div>
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
