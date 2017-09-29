import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResourcesActions from '../Data/Redux/ResourcesRedux';
import NeedsActions from '../Data/Redux/NeedsRedux';

class Home extends Component {

  componentDidMount() {
    this.props.getResources(); 
    this.props.getNeeds();
  }
  
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = dispatch => ({
  getResources: () => dispatch(ResourcesActions.getRequest()),
  getNeeds: data => dispatch(NeedsActions.getOneRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);