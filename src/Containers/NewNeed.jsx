import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        resources: PropTypes.array,
        getresources: PropTypes.func,
        createNeed: PropTypes.func,
        updateresources: PropTypes.func,
    };

    static defaultProps = {
        resources: [],
    };

    handleExpandClick(){
        this.setState({ expanded: !this.state.expanded });
    };
  
  render() {
    return (
      <div>
        <GridList cols={3}>
            {this.props.resources.map(item => <NewNeedView
                item = {item}
                handleExpandClick = {this.handleExpandClick}/>)}
        </GridList>
      </div>
    )
  }

}

const mapStateToProps = state => ({
    userId: state.user.userId,
    resources: state.resources.getOne.results,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNeed);