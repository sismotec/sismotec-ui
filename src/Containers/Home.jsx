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
    this.user = {};
  }

  componentDidMount() {
    this.props.getResources();
    this.props.getNeeds();
  }

  componentWillReceiveProps(nextProps, oldProps) {
    if(nextProps.userId || nextProps.userType) {
      this.user = {
        userId: nextProps.userId,
        type: nextProps.userType
      }
    }
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
          profile = {needs.filter(b => (b.id == this.state.profileDetailsId))[0]} /> }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);