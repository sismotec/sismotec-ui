import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlphaTable from "../Presentational/AlphaTable";
import OrdersActions from '../Data/Redux/OrdersRedux';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
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

class Orders extends React.Component {
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

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="container">
        <h1>Donaciones</h1>
        <div className="tabcontainer">
          <Tabs value={"0"} indicatorColor="primary" textColor="primary" fullWidth onChange={this.handleChange}>
            <Tab value="0" label="Enviadas"></Tab>
            <Tab value="1" label="Guardadas"></Tab>
          </Tabs>
        </div>
        {value === '0' && 
            <TabContainer>{
              <div>
                <AlphaTable />
              </div>}
            </TabContainer>}
        {value === '1' && <TabContainer>{'Item Two'}</TabContainer>}
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
