import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CatalogItem from '../Presentational/CatalogItem';
import { GridList, GridListTile } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Search from '../Presentational/CustomRow/FuzzySearch';
import ResourcesActions from '../Data/Redux/ResourcesRedux';
import NeedsActions from '../Data/Redux/NeedsRedux';
import '../index.css';
import './NewNeed.css';
let dummydata = [
	["Atún", "Alimentos"],
	["Agua", "Alimentos"],
	["Azúcar", "Alimentos"],
	["Sal", "Alimentos"],
	["Pala", "Herramientas"],
	["Jeringas", "Medicamentos"],
	["Baterías", "Otros"],
	["Empaquetado", "Voluntariado"],
	["Camión", "Transporte"],
	["Cargar", "Voluntariado"],
	["Atún", "Alimentos"],
	["Agua", "Alimentos"],
	["Azúcar", "Alimentos"],
	["Sal", "Alimentos"],
	["Pala", "Herramientas"],
	["Jeringas", "Medicamentos"],
	["Baterías", "Otros"],
	["Empaquetado", "Voluntariado"],
	["Camión", "Transporte"],
	["Cargar", "Voluntariado"]

];
let dats = dummydata.map(e => {return {
	nombre: e[0],
	cantidad: 3,
	unidad: 'bolsas',
	category: e[1]
}})
class NewNeed extends Component {

	constructor(props) {
		super(props);
		this.data = {};
		this.state = {
			expanded: false,
			filteredData: dats
		};

		this.handleExpandClick = this.handleExpandClick.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	componentDidMount() {
		this.props.getResources();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isAuth) {
			// Redirect to dashboard
			this.props.navigateToDashboard();
		}
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
	}

	handleAdd(resource) {
		this.props.createNeed({
			id_beneficiario: this.props.userId,
			recursos: [resource],
		});
	}

	filterNeeds = (event) => {
    let filterText = event.target.value;

    if (filterText === "") {
      this.setState({
				filteredData: dats
			});
      return;
    }
    const filter = filterText.toLowerCase();
    let newfilteredData = dats.filter((d) => {
      return d.nombre.toLowerCase().indexOf(filter) > -1 || d.category.toLowerCase().indexOf(filter) > -1;
    });
    this.setState({filteredData: newfilteredData});
  }

	render() {
		return (
			<div className="container NewNeed">
				<h1>Necesito</h1>
				<h2>Selecciona los recursos que necesitas</h2>
				{/*<Search fullWidth onChange={_ => ''} value="" placeholder={"E.j. atun"} />*/}
				<TextField
            id="search"
            label="Busca una necesidad"
            type="search"
            margin="normal"
            onChange={ this.filterNeeds.bind(this) }
          />
				<div className="mainCatalog">
					<GridList cols={5} spacing={20} cellHeight={200}>
						{this.state.filteredData.map(item => (
							<GridListTile
								className="ResourceTile"
								key={item.id}
								item = {item}
							>
								<p className="resourceName">{item.nombre}</p>
								<img className="resourceImg" src={process.env.PUBLIC_URL + '/icons/airplane.svg'} alt=""/>
								<p className="resourceCategory">{item.category}</p>
							</GridListTile>
							)
						)}
					</GridList>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	userId: state.user.userId,
	resources: state.resources.get.results,
});

const mapDispatchToProps = dispatch => ({
	getResources: () => dispatch(ResourcesActions.getRequest()),
	createNeed: data => dispatch(NeedsActions.createRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNeed);
