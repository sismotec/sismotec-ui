import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Layout extends Component {
  static propTypes = {
    slot: PropTypes.node.isRequired,
    isAuth: PropTypes.bool,
    needsAuth: PropTypes.bool,
  }

  static defaultProps = {
    isAuth: false,
    needsAuth: false,
  }

  render() {
    const { slot, isAuth, needsAuth } = this.props;
    return (
      <div>
        <div>
          {isAuth && <div>
            Navbar(Logged in)
          </div>}
          {!isAuth && <div>
            Navbar(Not logged in)
          </div>}
        </div>
        {needsAuth && !isAuth && <div>
          No autorizado
        </div>}
        {(!needsAuth || (needsAuth && isAuth)) && slot}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.user.userId,
});

export default connect(mapStateToProps)(Layout);