import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CatalogItem from '../Presentational/CatalogItem';
import { GridList, GridListTile } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Search from '../Presentational/CustomRow/FuzzySearch';
import ResourcesActions from '../Data/Redux/ResourcesRedux';
import Button from 'material-ui/Button';
import CustomRow from './CustomRow'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
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
	["Agua", "Alimentos", 1],
	["Azúcar", "Alimentos"],
	["Sal", "Alimentos"],
	["Pala", "Herramientas"],
	["Jeringas", "Medicamentos"],
	["Baterías", "Otros"],
	["Empaquetado", "Voluntariado"],
	["Camión", "Transporte"],
	["Cargar", "Voluntariado"]

];
let dats = dummydata.map((e, index) => {
	let tmp =  {
		id: index,
		nombre: e[0],
		cantidad: 3,
		unidad: 'bolsas',
		category: e[1],
		expanded: false
	}
	if(index == 10){
		tmp['special'] = true;
	}
	return tmp;
})
class NewNeed extends Component {

	constructor(props) {
		super(props);
		this.data = {};
		this.state = {
			expanded: false,
			filteredData: dats,
			active: null
		};

		this.handleExpandClick = this.handleExpandClick.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.filterNeeds = this.filterNeeds.bind(this);
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

	handleExpandClick(index){
		// this.setState({ expanded: !this.state.expanded });
		if(this.state.active) {
			// collapse the active one
			this.collapse(this.state.active)
		}
		let dats = this.state.filteredData;
		dats[index].expanded = true;
		this.setState({filteredData: dats, active: index});
	}
	collapse(index) {
		let dats = this.state.filteredData;
		dats[index].expanded = false;
		this.setState({filteredData: dats, active: null});
	}
	handleAdd(resource) {
		this.props.createNeed({
			id_beneficiario: this.props.userId,
			recursos: [resource],
		});
	}

	filterNeeds(event) {
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
	parseItemToNeed(item){

		let need = [
		        {
		          type: "Image",
		          src: process.env.PUBLIC_URL + '/icons/airplane.svg',
		          key: "icon"
		        },
		        {
		          type: "NumberField",
		          value: 10, // default value
		          key: "cantidad"
		        },
		        {
		          type: "Label",
		          value: item.unidad,
		          // options: [d.unidad],
		          key: "unidad"
		        },
		        {
		        	type: "Button",
		        	label: "Agregar nuevo",
		        	key: "btn",
		        	props: {
		        		raised: true,
		        		color: "primary"
		        	}
		        }
		];
		return need;
	}
	render() {
		var active = false;
		var activeitem = null;
		return (
			<div className="container NewNeed">
				<h1>Necesito</h1>
				<h2>Selecciona los recursos que necesitas</h2>
				{/*<Search fullWidth onChange={_ => ''} value="" placeholder={"E.j. atun"} />*/}
				<TextField id="search" fullWidth label="Busca una necesidad" type="search" margin="normal" onTouchTap={ this.filterNeeds.bind(this) } />
				<div className="mainCatalog">
					<GridList cols={5} spacing={20} cellHeight={200}>
						{this.state.filteredData.map((item, index) => {
								if(item['expanded']){
									active = true;
									activeitem = index;
								}
								if(active && index%5 == 0) {
									active = false;
									let activeItemObj = this.state.filteredData[activeitem];
									return (<GridListTile cols={5} className="ResourceTile special">
										<h1>{activeItemObj.nombre}</h1>
										<Table>
											<TableBody>
												<CustomRow need={this.parseItemToNeed(activeItemObj)}></CustomRow>
											</TableBody>
										</Table>
									</GridListTile>)
								}
								// if(item['special']){
								// }
								else{
									return (<GridListTile onClick={() => {this.handleExpandClick(index)}} className="ResourceTile">
										<CatalogItem item={item} />
									</GridListTile>)
								}
							}
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
