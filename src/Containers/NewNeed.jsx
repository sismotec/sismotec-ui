import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewNeedView from '../Presentational/NewNeedView';
import { GridList, GridListTile } from 'material-ui/GridList';
import ResourcesActions from '../Data/Redux/ResourcesRedux';


class NewNeed extends Component {

    componentDidMount() {
        this.props.getResources();
    }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuth) {
      // Redirect to dashboard
      this.props.navigateToDashboard();
    }    
  }
    constructor(props) {
        super(props);
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
      console.log(this.props);
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
    resources: state.resources.get.results,
});

const mapDispatchToProps = dispatch => ({
    getResources: () => dispatch(ResourcesActions.getRequest())});

export default connect(mapStateToProps, mapDispatchToProps)(NewNeed);