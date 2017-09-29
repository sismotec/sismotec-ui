import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlphaTable from "../Presentational/AlphaTable";
import SavedForLaterTable from "../Presentational/SavedForLaterTable";
import OrdersActions from '../Data/Redux/OrdersRedux';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MyNeeds from './MyNeeds';
import '../index.css';

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
            profileDetailsId: 0,
            // value: 0,
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
    console.log(this.props);
    return <div className="container">
        <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
              <Tab label={'Activos'} />
              <Tab label={this.props.type === "beneficiary" ? 'En Camino' : 'Enviados'} />
              <Tab label={this.props.type === "beneficiary" ? 'Recibidos' : 'Guardados'} />
              </Tabs>
        <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          {/*<TabContainer>Hola</TabContainer>*/}
          <TabContainer><MyNeeds type={this.props.type}/></TabContainer>
          <TabContainer><AlphaTable type={this.props.type} order={this.order}/></TabContainer>
          <TabContainer><SavedForLaterTable deleteNeed = {this.handleDeleteNeedFromOrder}/></TabContainer>
        </SwipeableViews>
      </div>
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  orders: state.orders.get.results,
  type: state.user.userType
});

const mapDispatchToProps = dispatch => ({
  ordersRequest: id => dispatch(OrdersActions.getOneRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
