import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

class Water extends React.Component {
	get styles() {
		return {
			select: {
				width:100
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			amount: 1
		}
		this.changeVal = this.changeVal.bind(this)
		this.changeUnit = this.changeUnit.bind(this)
	}

	changeVal(evt) {
		if (evt.target.value > 0) {
			this.props.changeWater(evt.target.value);
		}
	}

	changeUnit = name => event => {
		this.props.changeUnit(event.target.value);
	};

	render() {
		return (
			<TableRow>
				<TableCell>Agua</TableCell>
				<TableCell><Input type="number" min="1" name="waterLabel" onChange={this.changeVal} defaultValue="1"/></TableCell>
					<TableCell>
						<Select onChange={this.changeUnit()} value={this.props.unit} style={this.styles.select}>
							<MenuItem value="Mililitros">Mililitros</MenuItem>
							<MenuItem value="Litros">Litros</MenuItem>
						<MenuItem value="Galones">Galones</MenuItem>
					</Select>
				</TableCell>
			</TableRow>
		);
	}
}

class Atun extends React.Component {
	get styles() {
		return {
			select: {
				width: 100
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			amount: 1
		}
		this.changeVal = this.changeVal.bind(this)
		this.changeUnit2 = this.changeUnit2.bind(this)
	}

	changeVal(evt) {
		if (evt.target.value > 0) {
			this.props.changeAtun(evt.target.value);
		}
	}

	changeUnit2 = name => event => {
		this.props.changeUnit(event.target.value);
	};

	render() {
		return (
			<TableRow>
				<TableCell>Atun</TableCell>
				<TableCell><Input type="number" min={1} name="atunLabel" onChange={this.changeVal} defaultValue="1" /></TableCell>
				<TableCell>
					<Select onChange={this.changeUnit2()} value={this.props.unit} selected="selected" style={this.styles.select}>
						<MenuItem value="Gramos">Gramos</MenuItem>
						<MenuItem value="Kilogramos">Kilogramos</MenuItem>
					</Select>
				</TableCell>
			</TableRow>
		);
	}
}

class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			water: 1,
			atun: 1,
			waterUnit: "Litros",
			atunUnit: "Kilogramos",
			name: "JuanCa"
		}
		this.changeWater = this.changeWater.bind(this)
		this.changeAtun = this.changeAtun.bind(this)
		this.newOrder = this.newOrder.bind(this)
		this.waterUnit = this.waterUnit.bind(this)
		this.atunUnit = this.atunUnit.bind(this)
		this.readDB = this.readDB.bind(this)
	}

	get styles() {
		return {
			table: {
				fixedHeader: false,
				fixedFooter: false,
				stripedRows: false,
				showRowHover: false,
				selectable: false,
				multiSelectable: false,
				enableSelectAll: false,
				deselectOnClickaway: false,
				displaySelectAll: false,
				adjustForCheckbox: false,
				showCheckboxes: true,
				enableSelectAll: false,
				displayRowCheckbox: false,
				height: '200px',
				width: '1000px',
				marginLeft: '100px',
				textAlign: 'center',
				fontSize: '20px',
				colSpan: "3"
			},
			div: {
				marginTop: '50px',
				border: 'solid 1px black',
				borderRadius: '10px',
				width: '1200px',
				marginLeft:'150px',
				height: '600px'
			},
			button: {
				height: 50,
				width: 200,
				marginTop: 150,
				marginLeft: 950,
				borderRadius: 10,
				textAlign: 'center'
			},
			container: {
				flex: '1 1 100%;',
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'auto'
			},
			h1: {
				marginLeft: 100
			}
		};
	}

	waterUnit(str) {
		this.setState({
			waterUnit: str
		});
	}

	atunUnit(str) {
		this.setState({
			atunUnit: str
		});
	}

	changeWater(Amount) {
		this.setState({ water: Amount });
	}

	changeAtun(Amount) {
		this.setState({ atun: Amount });
	}

	newOrder() {
		console.log(this.state.atun + " " + this.state.atunUnit);
		console.log(this.state.water + " " + this.state.waterUnit);
	}

	readDB() {
		/*
		for (var i = 0; i < needs; i++) {
			switch (needs.name) {
				case "water":
					changeWater(needs.amount);
					changeWaterUnit(needs.unit);
					break;
				case "atun":
					changeAtun(needs.amount);
					changeAtunUnit(needs.unit);
					break;
			}
		}
		*/
	}

	render() {
		return (
				<div style={this.styles.div} >
				{
					this.readDB()
				}
				<h1 style={this.styles.h1}>{this.state.name}</h1>
				<Table style={this.styles.table} >
						<TableHead>
							<TableRow>
							<TableCell>Necesidad</TableCell>
							<TableCell>Cantidad</TableCell>
							<TableCell>Unidad</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.state.water > 0 ? <Water changeWater={this.changeWater.bind(this)} changeUnit={this.waterUnit.bind(this)} unit={this.state.waterUnit} /> : null
						}
						{
							this.state.atun > 0 ? <Atun changeAtun={this.changeAtun.bind(this)} changeUnit={this.atunUnit.bind(this)} unit={this.state.atunUnit} /> : null
						}
						</TableBody>
				</Table>

				<Button raised onClick={this.newOrder} color='primary' style={this.styles.button}>Generar Orden</Button>
			</div>
		);
	}
}

ReactDOM.render(<Order />, document.getElementById('root'));
