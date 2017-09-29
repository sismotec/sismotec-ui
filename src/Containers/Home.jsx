import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResourcesActions from '../Data/Redux/ResourcesRedux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import ProfileDetails from '../Presentational/ProfileDetails';
import ProfileCardsWrapper from '../Presentational/ProfileCardsWrapper';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profileDetailsIsOpen: false,
      profileDetailsId: 0
    }
    this.handleCloseProfileDetails = this.handleCloseProfileDetails.bind(this);
    this.handleOpenProfileDetails = this.handleOpenProfileDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddNeedToOrder = this.handleAddNeedToOrder.bind(this);
    this.handleDeleteNeedFromOrder = this.handleDeleteNeedFromOrder.bind(this);
    this.user = {};
    this.orders = [];
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

  handleChange(updatedNeed, id_need, id_profile) {
    /*A change has to do with your order */
    let profile = this.props.needs && this.props.needs.map(b => {
      if(b.id_propietario == id_profile) {
        return b
      }
    })[0];
    profile.recursos.map(r => r = r.id == id_need? updatedNeed : r);

    this.orders = (this.orders && this.orders.length>0) ? this.orders.map((o) => {
      if(o.destinatario && o.destinatario == id_profile) {
        if(o.recursos){
          o.recursos.map((r) => {
            if(r.id && r.id == id_need) {
              r = updatedNeed;
            }
          })
        }
      }
    }) : this.orders;
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
      profileDetailsIsOpen: false
    });
  }

  handleOpenProfileDetails = (id) => {
    this.setState({
      profileDetailsIsOpen: true,
      profileDetailsId: id
    });
  }

  handleViewLater = (data) => {
    //TODO: dispatch redux action
    console.log(data);
  }

  handleSend = (data) => {
    //TODO: dispatch redux action
    console.log(data);
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
    console.log('n', needs);
    return (
      <div>
        <ProfileCardsWrapper 
          profiles = {needs}
          openProfileDetails = {this.handleOpenProfileDetails}
          user = {this.user} />

        {needs && <ProfileDetails
          open = {this.state.profileDetailsIsOpen}
          user = {this.user}
          close = {this.handleCloseProfileDetails}
          profile = {needs.filter(b => (b.id_propietario == this.state.profileDetailsId))[0]} 
          deleteNeed = {this.handleDeleteNeedFromOrder}
          addNeed = {this.handleAddNeedToOrder}/> }
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
  getNeeds: data => dispatch(NeedsActions.getOneRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);