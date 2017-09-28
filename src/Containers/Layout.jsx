import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Login from './Login';
import Guest from '../Presentational/Headers/Guest';
import Beneficiary from '../Presentational/Headers/Beneficiary';
import CollectionCenter from '../Presentational/Headers/CollectionCenter';

class Layout extends Component {
  static propTypes = {
    slot: PropTypes.node.isRequired,
    isAuth: PropTypes.bool,
    needsAuth: PropTypes.bool,
  }

  static defaultProps = {
    needsAuth: false
  }

  constructor(props) {
    super(props);
    this.state = {
      loginIsOpen: false,
    }
  }

  render() {
    const { slot, userType, needsAuth } = this.props;
    return (
      <div>
        <div>
          {userType == 'collectionCenter' && <CollectionCenter navigateTo={this.props.navigateTo}/>}
          {userType == 'guest' && <div>
              <Guest navigateTo={this.props.navigateTo} openLogin={this.handleOpenLogin}/>
              <Login open = {this.state.loginIsOpen} closeLogin={this.handleCloseLogin}/>
            </div>}
          {userType == 'beneficiary' && <Beneficiary navigateTo={this.props.navigateTo}/>}
        </div>
        {needsAuth && userType == 'guest' && <div>
          No autorizado
        </div>}
        {(!needsAuth || (needsAuth && userType != 'guest')) && slot}
      </div>
    )
  }

  handleCloseLogin() {
    this.setState({
      loginIsOpen: false
    });
  }

  handleOpenLogin() {
    this.setState({
      loginIsOpen: true
    });
  }
}

const mapStateToProps = state => ({
  userType: state.user.userType
});

const mapDispatchToProps = dispatch => ({
  navigateTo: route => dispatch(push(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);