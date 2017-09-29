import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import NewNeedView from '../Presentational/NewNeedView';
import { GridList, GridListTile } from 'material-ui/GridList';

class NewNeed extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuth) {
      // Redirect to dashboard
      this.props.navigateToDashboard();
    }    
  }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteNeed = this.deleteNeed.bind(this);
        this.data = {};
        this.state = {
            expanded: false
        };

        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    static propTypes = {
        needs: PropTypes.array,
        getNeeds: PropTypes.func,
        createNeed: PropTypes.func,
        updateNeeds: PropTypes.func,
    };

    static defaultProps = {
        needs: [],
    };

    handleExpandClick(){
        this.setState({ expanded: !this.state.expanded });
    };
  
  render() {
    return (
      <div>
        <GridList cols={3}>
          <NewNeedView
              handleExpandClick = {this.handleExpandClick}
              expanded = {this.state.expanded}/>
        </GridList>
      </div>
    )
  }

}

const mapStateToProps = state => ({
    userId: state.user.userId,
    needs: state.needs.get.results,
});

const mapDispatchToProps = dispatch => ({
    getNeeds: id => dispatch(NeedsActions.getRequest(id)),
    createNeed: data => dispatch(NeedsActions.createRequest(data)),
    updateNeeds: (id, data) => dispatch(NeedsActions.updateRequest(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNeed);