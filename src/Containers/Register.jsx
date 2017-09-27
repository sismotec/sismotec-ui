import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';

class Field extends Component {
    render() {
        return(
            <div>
              <label>{this.props.fieldName}</label>
              <br/>
              <input type="text"/>
            </div>
        )
    }
}

class Register extends Component {
    static propTypes = {
        isAuth: PropTypes.bool,
        registerRequest: PropTypes.func,
        navigateToDashboard: PropTypes.func,
    }

    componentWillMount() {
        // Redirect to dashboard
        if(this.props.isAuth) {
            this.props.navigateToDashboard();
        }
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuth) {
            // Redirect to dashboard
            this.props.navigateToDashboard();
        }
    }

    constructor() {
        super();
        this.state = {
            name: null,
            location: null,
            phone: null,
            email: null,
            password: null,
            passwordConfirmation: null,
        };
    }

    render() {
        return (
            <div>
              <h1>Registro de beneficiario</h1>
              <Field fieldName="Nombre"/>
              <Field fieldName="Ubicación"/>
              <Field fieldName="Teléfono de contacto"/>
              <Field fieldName="Correo electrónico"/>
              <Field fieldName="Contraseña"/>
              <Field fieldName="Confirmar contraseña"/>
              <button>Registrarme</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: !!state.user.userId,
});

const mapDispatchToProps = dispatch => ({
    registerRequest: data => dispatch(LoginActions.registerRequest(data)),
    navigateToDashboard: () => dispatch(push('/dashboard')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);