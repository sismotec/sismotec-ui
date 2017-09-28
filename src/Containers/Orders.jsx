import React, { Component } from 'react';
import { connect } from 'react-redux';
import BeneficiaryCard from "../Presentational/BeneficiaryCard";
import EnhancedTable from "../Presentational/OrdersTable";
import OrdersActions from '../Data/Redux/OrdersRedux';

function getDummyData() {
  return [
        {
          id: '823648',
          date: '19/07/17', 
          status: 'Recibido',
          origin: "Tec de Monterrey",
          destination: "Luis Miguel",
          pdf: "PDF",
          check: "Marcar recibido",
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
          status: 'No recibido',
          origin: "Centro de acopio San Juan Bosco",
          destination: "Jimena Garza",
          pdf: "PDF",
          check: "Marcar recibido",
          items: [{
            name: "Agua", qty: "150", unit: "L"
          }]
        },
        {
          id: '673244', 
          date: '11/07/17',  
          status: 'Recibido',
          origin: "Centro de acopio San Juan Bosco",
          destination: "Esteba Garza",
          pdf: "PDF",
          check: "Marcar recibido",
          items: [{
            name: "Agua", qty: "150", unit: "L"
          }]
        }
      ]
}

class Orders extends Component {
  componentDidMount() {
    const { userId, ordersRequest } = this.props;
    ordersRequest(userId);
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

        <br></br>

        <EnhancedTable type="SENDER" data={getDummyData()} />
        
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
