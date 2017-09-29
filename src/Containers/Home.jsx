import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ResourcesActions from '../Data/Redux/ResourcesRedux';
import ProfileDetails from '../Presentational/ProfileDetails';
import BeneficiaryCard from '../Presentational/BeneficiaryCard';

import GridList from 'material-ui/GridList';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profileDetailsIsOpen: false,
      profileDetailsId: 0
    }
    this.handleCloseProfileDetails = this.handleCloseProfileDetails.bind(this);
    this.handleOpenProfileDetails = this.handleOpenProfileDetails.bind(this);
  }

  componentDidMount() {
    // this.props.getResources(); 
    // this.props.getNeeds();
  }

  componentWillMount() {
    // const { userId, getNeeds } = this.props
    // getNeeds(userId)
    this.beneficiaries = [
      {
        id: 0,
        nombre: "Caritas",
        ubicacion: {lat: '123.5', lon: '131.8'},
        recursos: [
          {
            id: 1,
            nombre: "agua",
            cantidad: 3,
            unidad: "litros",
          },
          {
            id: 2,
            nombre: "atun",
            cantidad: 100,
            unidad: "gramos",
          },
          {
            id: 3,
            nombre: "cobijas",
            cantidad: 3,
            unidad: "cobijas",
          }
        ]
      },
      {
        id: 1,
        nombre: "Cruz Roja",
        ubicacion: {lat: '23', lon: '31'},
        recursos: [
          {
            id: 1,
            nombre: "agua",
            cantidad: 3,
            unidad: "litros",
          },
          {
            id: 2,
            nombre: "atun",
            cantidad: 100,
            unidad: "gramos",
          },
          {
            id: 3,
            nombre: "cobijas",
            cantidad: 3,
            unidad: "cobijas",
          }
        ]
      },
      {
        id: 2,
        nombre: "Mely",
        ubicacion: {lat: '3', lon: '311'},
        recursos: [
          {
            id: 1,
            nombre: "agua",
            cantidad: 3,
            unidad: "litros",
          },
          {
            id: 2,
            nombre: "atun",
            cantidad: 100,
            unidad: "gramos",
          },
          {
            id: 3,
            nombre: "cobijas",
            cantidad: 3,
            unidad: "cobijas",
          }
        ]
      },
    ];

    this.user = {
      name: "Admin",
      type: "collectionCenter"
    }
  }
  
  handleCloseProfileDetails = () => {
    this.setState({
      profileDetailsIsOpen: false
    });
  }

  handleOpenProfileDetails = (id) => {
    this.setState({
      profileDetailsIsOpen: true,
      profileDetailsId: id
    });
  }

  handleViewLater = (data) => {
    //TODO: dispatch redux action
    console.log(data);
  }

  handleSend = (data) => {
    //TODO: dispatch redux action
    console.log(data);
  }

  render() {
    return (
      <div>
        {this.beneficiaries.map((b, index) => 
          <BeneficiaryCard 
            beneficiary={b} 
            openProfileDetails={(id) => this.handleOpenProfileDetails(id)}
            user={this.user}/>
        )}

      <ProfileDetails
        open = {this.state.profileDetailsIsOpen}
        user = {this.user}
        close = {this.handleCloseProfileDetails}
        profile = {this.beneficiaries.filter(b => (b.id == this.state.profileDetailsId))[0]} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = dispatch => ({
  // getResources: () => dispatch(ResourcesActions.getRequest()),
  // getNeeds: data => dispatch(NeedsActions.getOneRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);