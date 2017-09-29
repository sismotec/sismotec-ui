import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const columnData = [
	{ id: 'id', numeric: true, disablePadding: false, label: '# Orden' },
	{ id: 'date', numeric: false, disablePadding: false, label: 'Fecha de creación' },
	{ id: 'destination', numeric: false, disablePadding: false, label: 'Destino' },
	{ id: 'state', numeric: false, disablePadding: false, label: 'Estado' },
	{ id: 'pdf', numeric: false, disablePadding: false, label: 'PDF'},
];

function getColumnData(type) {
	if (type == "SENDER") {
		return [
						// { id: 'id', numeric: true, disablePadding: false, label: '# Orden' },
						{ id: 'date', numeric: false, disablePadding: false, label: 'Fecha de creación' },
						{ id: 'destination', numeric: false, disablePadding: false, label: 'Destino' },
						{ id: 'state', numeric: false, disablePadding: false, label: 'Estado' },
						{ id: 'pdf', numeric: false, disablePadding: false, label: 'PDF'},
					];
	} else {
		return [
						// { id: 'id', numeric: true, disablePadding: false, label: '# Orden' },
						{ id: 'date', numeric: false, disablePadding: false, label: 'Fecha de creación' },
						{ id: 'origin', numeric: false, disablePadding: false, label: 'Origen' },
						{ id: 'state', numeric: false, disablePadding: false, label: 'Estado' },
						{ id: 'check', numeric: false, disablePadding: false, label: 'Marcar completado'},
					];
	}
}

class EnhancedTableHead extends React.Component {
	static propTypes = {
		numSelected: PropTypes.number.isRequired,
		onRequestSort: PropTypes.func.isRequired,
		onSelectAllClick: PropTypes.func.isRequired,
		order: PropTypes.string.isRequired,
		orderBy: PropTypes.string.isRequired,
		rowCount: PropTypes.number.isRequired,
	};

	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

		return ( 
				<TableHead>
					<TableRow>
						{getColumnData(this.props.type).map(column => {
							return (
								<TableCell
									key={column.id}
									numeric={column.numeric}
									disablePadding={column.disablePadding}>
									<TableSortLabel
											active={true}
											direction={order}
											onClick={this.createSortHandler(column.id)}>
											{column.label}
										</TableSortLabel>
								</TableCell>
							);
						}, this)}
					</TableRow>
				</TableHead>
		)
	}
}

class EnhancedTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: 'asc',
			orderBy: 'id',
			selected: [],
			data: props.data.sort((a, b) => (a.id < b.id ? -1 : 1)),
			page: 0,
			rowsPerPage: 20,
			type: props.type
		};
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		const data =
			order === 'desc'
				? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
				: this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

		this.setState({ data, order, orderBy });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		this.setState({ selected: newSelected });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const classes = this.props.classes;
		const { data, order, orderBy, selected, rowsPerPage, page, type } = this.state;

		return (
			<Paper>
				<div>
					<Table>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
							type={type}
						/>
						<TableBody>
							{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
								const isSelected = this.isSelected(n.id);
								return (
									<TableRow
										hover
										onClick={event => this.handleClick(event, n.id)}
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell numeric>{n.date}</TableCell>
										<TableCell numeric>{n.origin}</TableCell>
										<TableCell numeric>{n.status}</TableCell>
										<TableCell numeric>{n.pdf}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</Paper>
		);
	}
}

EnhancedTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default EnhancedTable;
