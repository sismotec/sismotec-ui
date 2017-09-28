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
import { red, purple, blue, grey } from 'material-ui/colors';
import 'typeface-roboto'
import Typography from 'material-ui/Typography';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';

const styles = {
	avatar: {
		background: blue[100],
		color: blue[600],
	},
};

class CustomTableRow extends React.Component {
	get styles() {
		return {
			select: {
				width: 100,
				color: grey[50],
			},
			table: {
				color: grey[50]
			}
		}
	}


	constructor(props) {
		super(props);
		this.state = {
			amount: 0,
		}
		this.changeVal = this.changeVal.bind(this)
		this.changeUnit = this.changeUnit.bind(this)
	}

	changeVal(evt) {
		if (evt.target.value > 0) {
			this.props.changeItem(evt.target.value);
		}
	}

	changeUnit = name => event => {
		this.props.changeUnit(event.target.value);
	};

	render() {
		return (
			<TableRow style={this.styles.table}>
				<TableCell style={this.styles.table}>{this.props.name}</TableCell>
				<TableCell style={this.styles.table}><Input type="number" min="1" name="itemLabel" onChange={this.changeVal} defaultValue="1" style={this.styles.table} /></TableCell>
				<TableCell style={this.styles.table}>
					{
						this.props.type === "liquid" ? < Select onChange={this.changeUnit()} value={this.props.unit} style={this.styles.select}>
							<MenuItem value="Mililitros">Mililitros</MenuItem>
							<MenuItem value="Litros">Litros</MenuItem>
							<MenuItem value="Galones">Galones</MenuItem>
						</Select> : <Select style={this.styles.table} onChange={this.changeUnit()} value={this.props.unit} selected="selected" style={this.styles.select}>
								<MenuItem value="Gramos">Gramos</MenuItem>
								<MenuItem value="Kilogramos">Kilogramos</MenuItem>
							</Select>
					}
				</TableCell>
			</TableRow>
		);
	}
}

class DialogG extends React.Component {
	get styles() {
		return {
			buttons: {
				display: 'inline-block',
				marginTop: '10px'
			},
			addButton: {
				width: '50px',
				height: '50px'

			},
			subButton: {
				width: '50px',
				height: '50px',
				marginLeft: '30px'
			},
			defButton: {
				marginTop: '30px'
			},
			input: {
				textAlign: 'center',
				width: '50px',
			}
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			hours: 0,
			open: false
		}
		this.handleListItemClick = this.handleListItemClick.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
		this.define = this.define.bind(this)
	}

	handleRequestClose = () => {
		this.props.onRequestClose(this.props.selectedValue);
	};

	handleListItemClick = value => {
		this.props.onRequestClose(value);
	};

	define() {
		this.handleRequestClose();
	}

	render() {
		const { classes, onRequestClose, selectedValue, ...other } = this.props;

		return (
			<Dialog onRequestClose={this.handleRequestClose}  {...other}>
				<DialogTitle>Gracias por su donativo</DialogTitle>
				<div style={this.styles.buttons}>
					<Icon backgroundColor="primary"></Icon>
				</div>
				<Button raised onClick={this.define} color='primary' style={this.styles.defButton}>Gracias</Button>
			</Dialog>
		);
	}
}


class DialogHours extends React.Component {
	get styles () {
		return {
			buttons: {
				display: 'inline-block',
				marginTop: '10px'
			},
			addButton: {
				width: '50px',
				height: '50px'
				
			},
			subButton: {
				width: '50px',
				height: '50px',
				marginLeft: '30px'
			},
			defButton: {
				marginTop: '30px'
			},
			input: {
				textAlign: 'center',
				width: '50px', 
			}
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			hours: 0,
			open: false
		}
		this.handleListItemClick = this.handleListItemClick.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
		this.sub = this.sub.bind(this)
		this.add = this.add.bind(this)
		this.changeVal = this.changeVal.bind(this)
		this.define = this.define.bind(this)
	}

	handleRequestClose = () => {
		this.props.onRequestClose(this.props.selectedValue);
	};

	handleListItemClick = value => {
		this.props.onRequestClose(value);
	};

	changeVal(evt) {
		this.setState({ hours: evt });
	}

	add() {
		this.setState({ hours: this.state.hours + 1 })
	}

	sub() {
		this.setState({ hours: this.state.hours - 1 })
	}

	define() {
		this.setState({ open: true });
	}

	handleRequestClose2 = value => {
		this.setState({ selectedValue: value, open: false });
	};

	render() {
		const { classes, onRequestClose, selectedValue, ...other } = this.props;

		return (
			<Dialog onRequestClose={this.handleRequestClose}  {...other}>
				<DialogTitle>Tiempo Estimado de Envio</DialogTitle>
				<div style={this.styles.buttons}>
					<Button raised onClick={this.sub} color='primary' style={this.styles.subButton}>-</Button>
					<Input style={this.styles.input} type="number" min={1} name="hoursLabel" onChange={this.changeVal} value={this.state.hours} disabled/>
					<Button raised onClick={this.add} color='primary' style={this.styles.addButton}>+</Button>
				</div>
				<Button raised onClick={this.define} color='primary' style={this.styles.defButton}>Continuar</Button>
				<SimpleDialogWrapped2
					selectedValue={this.state.selectedValue}
					open={this.state.open}
					onRequestClose={this.handleRequestClose2}
				/>
			</Dialog>
		);
	}
}

DialogHours.propTypes = {
	classes: PropTypes.object.isRequired,
	onRequestClose: PropTypes.func,
	selectedValue: PropTypes.string,
};

DialogG.propTypes = {
	classes: PropTypes.object.isRequired,
	onRequestClose: PropTypes.func,
	selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(DialogHours);
const SimpleDialogWrapped2 = withStyles(styles)(DialogG);

class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			water: 1,
			atun: 1,
			waterUnit: "Litros",
			atunUnit: "Kilogramos",
			name: "JuanCa",
			open: false,
			selectedValue: 0
		}
		this.changeWater = this.changeWater.bind(this)
		this.changeAtun = this.changeAtun.bind(this)
		this.newOrder = this.newOrder.bind(this)
		this.waterUnit = this.waterUnit.bind(this)
		this.atunUnit = this.atunUnit.bind(this)
		this.readDB = this.readDB.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
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
				colSpan: "3",
				color: grey[50],
				marginTop: '30px'
			},
			div: {
				marginTop: '50px',
				borderRadius: '10px',
				width: '1200px',
				marginLeft:'150px',
				height: '600px',
				backgroundColor: blue[600],
				color: grey[50],
				position: 'fixed'
			},
			enviarButton: {
				height: 50,
				width: 200,
				borderRadius: 10,
				marginLeft: 500,
				textAlign: 'center',
				display: 'inline-block',
				position: 'fixed'
			},
			generarButton: {
				height: 50,
				width: 200,
				marginLeft: 950,
				borderRadius: 10,
				textAlign: 'center',
				display: 'inline-block',
				position: 'fixed'
			},
			container: {
				flex: '1 1 100%;',
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'auto'
			},
			buttons: {
				display: 'inline-block',
				marginTop: '100px'
			},
			h1: {
				marginTop:50,
				marginLeft: 100,
				color: grey[50]
			},
			body: {
				backgroundColor: purple[500],
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
		console.log(this.state.water + " " + this.state.waterUnit);
		console.log(this.state.atun + " " + this.state.atunUnit);
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

	handleClickOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleRequestClose = value => {
		this.setState({ selectedValue: value, open: false });
	};

	render() {
		return (
			<div style={this.styles.body}>
			<div style={this.styles.div}>
				{
					this.readDB()
				}
				<Typography type="display2" style={this.styles.h1}>{this.state.name}</Typography>
				<Table style={this.styles.table} >
					<TableHead style={this.styles.table}>
							<TableRow>
							<TableCell>Necesidad</TableCell>
							<TableCell>Cantidad</TableCell>
							<TableCell>Unidad</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							{
								this.state.water > 0 ? <CustomTableRow changeItem={this.changeWater.bind(this)} changeUnit={this.waterUnit.bind(this)} unit={this.state.waterUnit} name="Agua" type="liquid"/> : null
						}
						{
								this.state.atun > 0 ? <CustomTableRow changeAtun={this.changeAtun.bind(this)} changeUnit={this.atunUnit.bind(this)} unit={this.state.atunUnit} name="Atun" type="solid"/> : null
						}
						</TableBody>
				</Table>
				<div style={this.styles.buttons}>
					<Button raised onClick={this.handleClickOpen} color='primary' style={this.styles.enviarButton}>Enviar Orden</Button>
						<SimpleDialogWrapped
							selectedValue={this.state.selectedValue}
							open={this.state.open}
							onRequestClose={this.handleRequestClose}
						/>
						{

						}
						<Button raised onClick={this.newOrder} color='primary' style={this.styles.generarButton}>Generar Orden</Button>
						</div>
			</div>
				</div>
		);
	}
}

ReactDOM.render(<Order />, document.getElementById('root'));
