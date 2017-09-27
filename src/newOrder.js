import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';


class Water extends React.Component {
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

	changeUnit = (event, index, value) => this.props.changeUnit( value );

	render() {
		return (
			<MuiThemeProvider>
			<TableRow>
					<TableRowColumn>Agua</TableRowColumn>
					<TableRowColumn><TextField type="number" min="1" name="waterLabel" onChange={this.changeVal} defaultValue="1"></TextField></TableRowColumn>
				<TableRowColumn>
					<DropDownMenu onChange={this.changeUnit} value={this.props.unit} selected="selected">
						<MenuItem value="Mililitros" primaryText="Mililitros" />
						<MenuItem value="Litros" primaryText="Litros" />
						<MenuItem value="Galones" primaryText="Galones" />
					</DropDownMenu>
				</TableRowColumn>
			</TableRow>
			</MuiThemeProvider>
		);
	}
}

class Atun extends React.Component {
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
			this.props.changeAtun(evt.target.value);
		}
	}

	changeUnit = (event, index, value) => this.props.changeUnit(value);

	render() {
		return (
			<TableRow>
				<TableRowColumn>Atun</TableRowColumn>
				<TableRowColumn><TextField type="number" min="1" name="atunLabel" onChange={this.changeVal} defaultValue="1"></TextField></TableRowColumn>
				<TableRowColumn>
					<DropDownMenu onChange={this.changeUnit} value={this.props.unit} selected="selected">
						<MenuItem value="Gramos" primaryText="Gramos" />
						<MenuItem value="Kilogramos" primaryText="Kilogramos" />
					</DropDownMenu>
				</TableRowColumn>
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
				showRowHover: true,
				selectable: false,
				multiSelectable: false,
				enableSelectAll: false,
				deselectOnClickaway: false,
				displaySelectAll: false,
				adjustForCheckbox:false,
				height: '200px',
				width: '1400px',
				marginLeft: '15px',
				textAlign: 'center',
				fontSize:'20px'
			},
			div: {
				marginTop: '50px',
				border: 'solid 1px black',
				borderRadius: '10px',
				width: '1425px',
				marginLeft:'50px',
				height: '600px'
			},
			button: {
				height: 50,
				width: 200,
				marginTop: 150,
				marginLeft: 1200,
				borderRadius: 10,
				textAlign: 'center'
			},
			container: {
				flex: '1 1 100%;',
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'auto'
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
			<MuiThemeProvider>
				<div style={this.styles.div} >
				{
					this.readDB()
				}
				<h1 id="header">{this.state.name}</h1>
				<Table style={this.styles.table} >
						<TableHeader>
							<TableRow>
							<TableHeaderColumn>Necesidad</TableHeaderColumn>
							<TableHeaderColumn>Cantidad</TableHeaderColumn>
							<TableHeaderColumn>Unidad</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							this.state.atun > 0 ? <Atun changeAtun={this.changeAtun.bind(this)} changeUnit={this.atunUnit.bind(this)} unit={this.state.atunUnit} /> : null
						}
						{
							this.state.water > 0 ? <Water changeWater={this.changeWater.bind(this)} changeUnit={this.waterUnit.bind(this)} unit={this.state.waterUnit} /> : null
						}
						</TableBody>
				</Table>

				<RaisedButton onClick={this.newOrder} primary={true} label="Generar Orden" style={this.styles.button} />
			</div>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<Order />, document.getElementById('root'));
