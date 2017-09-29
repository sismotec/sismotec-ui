import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlphaTable from "../Presentational/AlphaTable";
import SavedForLaterTable from "../Presentational/SavedForLaterTable";
import OrdersActions from '../Data/Redux/OrdersRedux';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import '../index.css';

// let dummy = [
//     {
//       id: '823648',
//       date: '19/07/17', 
//       status: 'Recibido',
//       origin: "Tec de Monterrey",
//       destination: "Luis Miguel",
//       pdf: "PDF",
//       check: "Marcar recibido",
//       items: [{
//         name: "Agua", qty: "150", unit: "litros"
//       },
//       {
//         name: "Atún", qty: "300", unit: "latas"
//       }]
//     },
//     {
//       id: '213245', 
//       date: '22/07/17', 
//       status: 'No recibido',
//       origin: "Centro de acopio San Juan Bosco",
//       destination: "Jimena Garza",
//       pdf: "PDF",
//       check: "Marcar recibido",
//       items: [{
//         name: "Agua", qty: "150", unit: "L"
//       }]
//     },
//     {
//       id: '673244', 
//       date: '11/07/17',  
//       status: 'Recibido',
//       origin: "Centro de acopio San Juan Bosco",
//       destination: "Esteba Garza",
//       pdf: "PDF",
//       check: "Marcar recibido",
//       items: [{
//         name: "Agua", qty: "150", unit: "L"
//       }]
//       }
// ];
function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class Orders extends React.Component {

    constructor() {
        super();
        this.state = {
            profileDetailsIsOpen: false,
            profileDetailsId: 0
        }
        this.handleDeleteNeedFromOrder = this.handleDeleteNeedFromOrder.bind(this);
        this.user = {};
        this.orders = [];
    }

  componentDidMount() {
    const { userId, ordersRequest } = this.props;
    ordersRequest(userId);
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

    handleDeleteNeedFromOrder = (id_need, id_profile) => {
        let {order_index, need_index} = (this.orders && this.orders.length>0) ? this.orders.map((o, o_i) => {
            if(o.destinatario && o.destinatario == id_profile){
                if(o.recursos){
                    let n_i = o.recursos.map((r, index) => {
                        if(r == id_need) {
                            return index
                        }
                    })
                    return {o_i, n_i};
                }
            }
        }) : this.orders;


        if (this.orders && this.orders.length>0)
            this.orders[order_index].recursos.splice(need_index, 1);
    }

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <h1>Donaciones</h1>
        <div className="tabcontainer">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Enviadas" />
            <Tab label="Guardadas" />
          </Tabs>
        </div>

        <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          <TabContainer><AlphaTable /></TabContainer>
          <TabContainer><SavedForLaterTable deleteNeed = {this.handleDeleteNeedFromOrder}/></TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  orders: state.orders.get.results,
});

const mapDispatchToProps = dispatch => ({
  ordersRequest: id => dispatch(OrdersActions.getOneRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
