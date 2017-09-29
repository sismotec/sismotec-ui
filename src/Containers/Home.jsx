import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResourcesActions from '../Data/Redux/ResourcesRedux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import OrdersActions from '../Data/Redux/OrdersRedux';
import ProfileDetails from '../Presentational/ProfileDetails';
import ProfileCardsWrapper from '../Presentational/ProfileCardsWrapper';
import ETADialog from '../Presentational/ETADialog';
import SentSuccessDialog from '../Presentational/SentSuccessDialog';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profileDetailsId: 0,
      profileSteps: 0,
    }
    this.handleCloseProfileDetails = this.handleCloseProfileDetails.bind(this);
    this.handleOpenProfileDetails = this.handleOpenProfileDetails.bind(this);
    this.handleAddNeedToOrder = this.handleAddNeedToOrder.bind(this);
    this.handleDeleteNeedFromOrder = this.handleDeleteNeedFromOrder.bind(this);
    this.user = {};
    this.orders = [];
    this.currentOrder = {};
  }

  componentDidMount() {
    this.props.getResources();
    this.props.getNeeds();
    // this.props.getOrders();
  }

  componentWillReceiveProps(nextProps, oldProps) {
    if(nextProps.userId || nextProps.userType) {
      this.user = {
        userId: nextProps.userId,
        type: nextProps.userType
      }
    }
  }

  handleAddNeedToOrder(newNeed, id_profile) {
    this.orders = (this.orders && this.orders.length>0) ? this.orders.map((o) => {
      if(o.destinatario && o.destinatario == id_profile){
        if(o.recursos){
          o.recursos.push(newNeed);
        }
      }
    }) : this.orders;
  }
  
  handleCloseProfileDetails = () => {
    this.setState({
      profileSteps: 0,
    });
    this.currentOrder = {};
  }

  handleOpenProfileDetails = (id) => {
    this.setState({
      profileDetailsId: id,
      profileSteps: 1,
    });
  }

  handleViewLater = (data) => {
    // this.props.saveForLater({
    //   id_centro_de_acopio: this.props.userId,
    //   id_necesidad,
    //   destino_latitud: latitud,
    //   destino_longitud: longitud,
    //   recursos: data,
    // });
    // this.setState({
    //   profileSteps: 0,
    // });
  }

  handleSend = (data, { id_necesidad, latitud, longitud }) => {
    this.currentOrder = {
      id_centro_de_acopio: this.props.userId,
      id_necesidad,
      destino_latitud: latitud,
      destino_longitud: longitud,
      recursos: data,
    }
    this.setState({
      profileSteps: 2,
    });
  }

  handleSendWithETA = () => {
    this.props.createOrder(this.currentOrder);
    this.setState({
      profileSteps: 3,
    });
  }

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
    const { needs } = this.props;
    return (
      <div>
        <ProfileCardsWrapper 
          profiles = {needs}
          openProfileDetails = {this.handleOpenProfileDetails}
          user = {this.user} />

        {needs && <ProfileDetails
          open = {this.state.profileSteps === 1}
          user = {this.user}
          close = {this.handleCloseProfileDetails}
          profile = {needs.filter(b => (b.id_propietario == this.state.profileDetailsId))[0]} 
          deleteNeed = {this.handleDeleteNeedFromOrder}
          addNeed = {this.handleAddNeedToOrder}
          handleSend={this.handleSend}
          handleViewLater={this.handleViewLater} /> }

        <ETADialog
          open={this.state.profileSteps === 2}
          close = {this.handleCloseProfileDetails}
          submitETA={this.handleSendWithETA}
        />

        <SentSuccessDialog 
          open={this.state.profileSteps === 3}
          close = {this.handleCloseProfileDetails}
        />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  userId: state.user.userId,
  userType: state.user.userType,
  needs: state.needs.getOne.result,
})

const mapDispatchToProps = dispatch => ({
  getResources: () => dispatch(ResourcesActions.getRequest()),
  getNeeds: data => dispatch(NeedsActions.getOneRequest(data)),
  createOrder: data => dispatch(OrdersActions.createRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);