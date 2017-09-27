import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class CreateOrder extends Component {
  static propTypes = {
    isAuth: PropTypes.bool,
  }

  render() {
    const { isAuth } = this.props
    return (
      <div>
        {!isAuth && <div>
          No autorizado
        </div>}
        {isAuth && <div>
          Crear orden
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.user.userId,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
