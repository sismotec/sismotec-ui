import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

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

	changeUnit(e) {
		this.props.changeUnit(e.target.value);
	}

	render() {
		return (
			<tr>
				<td>Agua</td>
				<td><input type="number" min="1" name="waterLabel" onChange={this.changeVal} defaultValue="1" /></td>
				<td>
					<select onChange={this.changeUnit} value={this.props.unit} selected="selected">
						<option value="Mililitros">Mililitros</option>
						<option value="Litros">Litros</option>
						<option value="Galones">Galones</option>
					</select>
				</td>
			</tr>
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

	changeUnit(e) {
		this.props.changeUnit(e.target.value);
	}

	render() {
		return (
			<tr>
				<td>Atun</td>
				<td><input type="number" min="1" name="atunLabel" onChange={this.changeVal} defaultValue="1" /></td>
				<td>
					<select onChange={this.changeUnit} value={this.props.unit} selected="selected">
						<option value="Gramos">Gramos</option>
						<option value="Kilogramos">Kilogramos</option>
					</select>
				</td>
			</tr>
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
			switch (needs.getName()) {
				case "water":
					changeWater(needs.getAmount());
					changeWaterUnit(needs.getUnit());
					break;
				case "atun":
					changeAtun(needs.getAmount());
					changeAtunUnit(needs.getUnit());
					break;
			}
		}
		*/
	}

	render() {
		return (
			<div id="div1">
				{
					this.readDB()
				}
				<h1 id="header">{this.state.name}</h1>
				<table>
					<thead>
						<tr>
							<th>Necesidad</th>
							<th>Cantidad</th>
							<th>Unidad</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.atun > 0 ? <Atun changeAtun={this.changeAtun.bind(this)} changeUnit={this.atunUnit.bind(this)} unit={this.state.atunUnit} /> : null
						}
						{
							this.state.water > 0 ? <Water changeWater={this.changeWater.bind(this)} changeUnit={this.waterUnit.bind(this)} unit={this.state.waterUnit} /> : null
						}
					</tbody>
				</table>

				<button onClick={this.newOrder}>
					Generar Orden
			  </button>
			</div>
		);
	}
}

ReactDOM.render(<Order />, document.getElementById('root'));
