import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Login from './Login';
import Register from './Register'
import Guest from '../Presentational/Headers/Guest';
import Beneficiary from '../Presentational/Headers/Beneficiary';
import CollectionCenter from '../Presentational/Headers/CollectionCenter';
import ProfileDetails from '../Presentational/ProfileDetails';
import LoginActions from '../Data/Redux/LoginRedux';

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
      signUpBeneficiaryIsOpen: false,
      signUpCenterIsOpen: false,
    }
  }

  render() {
    const { slot, userType, needsAuth } = this.props;
    return (
      <div>
        <div>
          {
            userType == 'collectionCenter' && 
            <CollectionCenter navigateTo={this.props.navigateTo} logout={this.props.logout} />}
          {
            userType == 'guest' && <div>
            <Guest 
              navigateTo={this.props.navigateTo} 
              openLogin={this.handleOpenLogin}
              openCenter={this.handleOpenCenter} 
              openBeneficiary={this.handleOpenBeneficiary}/>

            <Login 
              open = {this.state.loginIsOpen} 
              closeLogin={this.handleCloseLogin}/>

            <Register 
              open = {this.state.signUpBeneficiaryIsOpen}
              closeLogin={this.handleCloseBeneficiary} 
              registerType={'Beneficiary'}/>

            <Register 
              open = {this.state.signUpCenterIsOpen} 
              closeLogin={this.handleCloseCenter}
              registerType={'Center'}/>
            </div>
          }
          {userType == 'beneficiary' && <Beneficiary navigateTo={this.props.navigateTo} logout={this.props.logout} />}
        </div>
        {needsAuth && userType === 'guest' && <div>
          No autorizado
        </div>}
        {(!needsAuth || (needsAuth && userType !== 'guest')) && slot}
      </div>
    )
  }

  handleCloseLogin = () => {
    this.setState({
      loginIsOpen: false
    });
  }

  handleOpenLogin = () => {
    this.setState({
      loginIsOpen: true
    });
  }

  handleCloseBeneficiary = () => {
    this.setState({
      signUpBeneficiaryIsOpen: false
    });
  }

  handleOpenBeneficiary = () => {
    this.setState({
      signUpBeneficiaryIsOpen: true
    });
  }

  handleCloseCenter = () => {
    this.setState({
      signUpCenterIsOpen: false
    });
  }

  handleOpenCenter = () => {
    this.setState({
      signUpCenterIsOpen: true
    });
  }
}

const mapStateToProps = state => ({
  userType: state.user.userType
});

const mapDispatchToProps = dispatch => ({
  logout: data => dispatch(LoginActions.logout()),
  navigateTo: route => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
