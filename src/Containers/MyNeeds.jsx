import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import NeedsActions from '../Data/Redux/NeedsRedux';

class MyNeeds extends Component {
  static propTypes = {
    needs: PropTypes.array,
    getNeeds: PropTypes.func,
    createNeed: PropTypes.func,
    updateNeeds: PropTypes.func,
  }

  static defaultProps = {
    needs: [],
  }

  componentWillMount() {
    const { userId, getNeeds } = this.props
    getNeeds(userId)
  }
  
  render() {
    return (
      <div>
        Reporte de necesidades
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
  needs: state.needs.get.results,
});

const mapDispatchToProps = dispatch => ({
  getNeeds: id => dispatch(NeedsActions.getRequest(id)),
  createNeed: data => dispatch(NeedsActions.createRequest(id, data)),
  updateNeed: (id, data) => dispatch(NeedsActions.updateRequest(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyNeeds)
