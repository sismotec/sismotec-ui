import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResourcesActions from '../Data/Redux/ResourcesRedux';

class Home extends Component {

  componentDidMount() {
    this.props.getResources();  
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);