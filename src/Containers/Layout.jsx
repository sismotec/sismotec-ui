import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Layout extends Component {
  static propTypes = {
    slot: PropTypes.node.isRequired,
    isAuth: PropTypes.bool,
  }

  render() {
    const { slot, isAuth } = this.props;
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
        {slot}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.user.userId,
});

export default connect(mapStateToProps)(Layout);