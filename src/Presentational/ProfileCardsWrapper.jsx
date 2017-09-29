import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfileCard from './ProfileCard';

export default class ProfileCardsWrapper extends Component {
  constructor(props) {
    super(props);
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

  componentWillMount() {
  }

  render() {
    return (
      <div>
        { this.props.profiles && this.props.profiles.map(profile =>
          <ProfileCard
            profile={profile}
            openProfileDetails={(id) => this.props.openProfileDetails(id)}
            user={this.props.user} />
        )}
      </div>
    );
  }
}