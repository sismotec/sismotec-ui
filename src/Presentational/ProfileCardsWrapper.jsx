import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import "../index.css";
import ProfileCard from './ProfileCard';
import { GridList, GridListTile } from 'material-ui/GridList';

export default class ProfileCardsWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    profiles: PropTypes.array,
    openProfileDetails: PropTypes.func,
    user: PropTypes.object,
  }

  static defaultProps = {
    profiles: [],
    openProfileDetails: (id) => {},
    user: {} ,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filteredProfiles: nextProps.profiles});
  }

  filterProfileCards = (event) => {
    let filterText = event.target.value;

    if (filterText === "") {
      this.setState({filteredProfiles: this.props.profiles});
      return;
    }
    const filter = filterText.toLowerCase();
    let newfilteredProfiles = this.props.profiles.filter((p) => {
      let res = p.recursos.filter(r => 
        r.nombre.toLowerCase().indexOf(filter) > -1 || r.categoria.toLowerCase().indexOf(filter) > -1);
      return p.nombre_propietario.toLowerCase().indexOf(filter) > -1 || res.length > 1;
    });
    this.setState({filteredProfiles: newfilteredProfiles});
  }

  render() {
    let profiles = <p> No hay necesidades! </p>;
    if (this.state.filteredProfiles != null) {
      profiles = this.state.filteredProfiles.length == 0 ? profiles :
        this.state.filteredProfiles.map(profile =>
          <GridListTile key={profile.id}>
            <ProfileCard
              profile={profile}
              openProfileDetails={(id) => this.props.openProfileDetails(id)}
              user={this.props.user} />
          </GridListTile>
        )
    }
    return (
      <div className="container">
        <div>
          <TextField
            className="searchBox"
            id="search"
            label="Busca una necesidad"
            type="search"
            margin="normal"
            fullWidth
            onChange={ this.filterProfileCards.bind(this) }
          />
        </div>
        <GridList cellHeight={200} cols={3} spacing={20}>
          { profiles }
        </GridList>
      </div>

    );
  }
}