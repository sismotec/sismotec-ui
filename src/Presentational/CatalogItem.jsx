import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import CustomRow from "../Containers/CustomRow";
import Table, { TableBody } from 'material-ui/Table';
import '../Containers/NewNeed.css';

import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';

export default class CatalogItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		}
		this.data = { ...this.props.item };
		this.fields = [
			{
				type: "Label",
				value: this.props.item.nombre,
				key: "nombre"
			},
			{
				type: "NumberField",
				value: this.props.item.cantidad,
				key: "cantidad"
			},
			{
				type: "FuzzySearch",
				value: this.props.item.unidad,
				options: [this.props.item.unidad],
				key: "unidad"
			},
			{
				type: "Add",
			}
		]
		this.handleChange = this.handleChange.bind(this);
		this.handleExpandClick = this.handleExpandClick.bind(this);
		this.addNeed = this.addNeed.bind(this);
	}

	handleExpandClick() {
		this.setState({ expanded: !this.state.expanded });
	}

	handleChange(updatedNeed, id) {
		this.data = updatedNeed;
	}

	addNeed() {
		this.props.handleAdd(this.data);
	}

	render() {
		let item = this.props.item;
		return (
			<div>
				<p className="resourceName">{item.nombre}</p>
				<img className="resourceImg" src={process.env.PUBLIC_URL + '/icons/airplane.svg'} alt=""/>
				<p className="resourceCategory">{item.category}</p>
			</div>
		)
	}
}