import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginActions from '../Data/Redux/LoginRedux';
import TextField from 'material-ui/TextField';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MaskedInput from 'react-text-mask';

const TextMaskCustom = (props) => (
  <MaskedInput
    {...props}
    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    placeholderChar={'\u2000'}
    showMask
  />
)

const MapWithAMarker = compose( withScriptjs, withGoogleMap)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={props.position}
    center={props.position}
  >
    <Marker
      draggable={true}
      defaultPosition={props.position}
      position={props.position}
      onDragEnd={props.handleDrag}
    />
  </GoogleMap>
);

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDW0VmPFBIrIhKCz8ELvMIqkXLH0D9s0Fg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={()=> {
        props.onPlacesChanged();
      }}
    >
      <input
        type="text"
        placeholder="Ingresa una dirección"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: '100%',
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    {props.handlePlaces(props.places)}
  </div>
);


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      position: { lat: 25.6487281, lng: -100.4431818 },
      shouldGetLocation: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handlePlaces = this.handlePlaces.bind(this);
  }

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

    this.getLocation();
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuth) {
      // Redirect to dashboard
      this.props.navigateToDashboard();
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handlePlaces(places) {
    let firstPlace = places[0];
    if (firstPlace) {
      this.setState({
        position: { lat: firstPlace.geometry.location.lat(), lng: firstPlace.geometry.location.lng()},
      });
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          position: { lat: position.coords.latitude, lng: position.coords.longitude},
        });
      }, function() {
        console.log("Error");
      });
    } else {
      console.log("Error");
    }
  }

  handleDrag(event) {
    this.setState({
      position: { lat: event.latLng.lat(), lng: event.latLng.lng()},
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirmation) {
      // eslint-disable-next-line
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(this.state.email)) {
        this.props.registerRequest({
          nombre_organizacion : this.state.name,
          nombre_responsable: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          latitud: this.state.position.lat,
          longitud: this.state.position.lng,
          password: this.state.password,
          tipo: this.props.registerType === 'Beneficiary' ? 'Beneficiario' : 'Centro de acopio',
        });
      }
    }
  }

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.closeLogin}>
        <DialogTitle className="dialog-title">
          {this.props.registerType === 'Beneficiary' ? 'Registro de beneficiario' : 'Registro de Centro de Acopio'}
        </DialogTitle>
        <DialogContent style={{
          overflow: 'auto',
          width: '400px'
        }}>
          <form validate autoComplete="off">
            <TextField
              fullWidth
              required
              id="name"
              label="Nombre"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <br/>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.shouldGetLocation}
                  onChange={() => {
                    if(!this.state.shouldGetLocation) this.getLocation();
                    this.setState({ shouldGetLocation: !this.state.shouldGetLocation })
                  }}
                />
              }
              label="Usar mi ubicación actual"
            />
            {!this.state.shouldGetLocation && <div>
              <PlacesWithStandaloneSearchBox handlePlaces={this.handlePlaces}/>
              <br/>
              <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW0VmPFBIrIhKCz8ELvMIqkXLH0D9s0Fg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                handleDrag={this.handleDrag}
                position={this.state.position}
              />
            </div>
            }
            <br/>
            <div><InputLabel className="phone-registry" htmlFor="phone-helper">Tel&eacute;fono *</InputLabel></div>
            <Input
              required
              fullWidth
              id="phone"
              label="Teléfono"
              value={this.state.phone}
              onChange={this.handleChange('phone')}
              margin="normal"
              inputComponent={TextMaskCustom}
            />
            <br/>
            <TextField
              fullWidth
              required
              id="email"
              label="Correo electrónico"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <br/>
            <TextField
              fullWidth
              required
              id="password"
              label="Contraseña"
              value={this.state.password}
              type="password"
              onChange={this.handleChange('password')}
              margin="normal"
            />
            <br/>
            <TextField
              fullWidth
              required
              id="passwordConfirmation"
              label="Confirmar contraseña"
              value={this.state.passwordConfirmation}
              type="password"
              onChange={this.handleChange('passwordConfirmation')}
              margin="normal"
            />
            <br/>
            <Button raised 
              type="submit"
              className="dialog-button"
              onClick={this.handleSubmit}>
              Registrarme
            </Button>
          </form>
        </DialogContent>
      </Dialog>
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
