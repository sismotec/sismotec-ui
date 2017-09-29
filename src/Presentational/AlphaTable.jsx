import React from 'react'
import '../index.css'
import './AlphaTable.css'
import Collapsible from '../Containers/Collapsible'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import CustomRow from '../Containers/CustomRow';
import Button from 'material-ui/Button';
import NumberField from '../Presentational/CustomRow/NumberField';
import Label from '../Presentational/CustomRow/Label';
import moment from 'moment';

let dummydata = [
	["Atún", "Alimentos", "latas"],
	["Agua", "Alimentos", "litros"],
	["Azúcar", "Alimentos", "kilos"],
	["Sal", "Alimentos", "kilos"],
	["Pala", "Herramientas", "unidades"],
	["Jeringas", "Medicamentos", "unidades"],
	["Baterías", "Otros", "unidades"],
	["Empaquetado", "Voluntariado", "personas"],
	["Camión", "Transporte", "toneladas"],
	["Cargar", "Voluntariado", "personas"],
	["Atún", "Alimentos", "latas"],
	["Agua", "Alimentos", "litros"],
	["Azúcar", "Alimentos", "kilos"],
	["Sal", "Alimentos", "kilos"],
	["Pala", "Herramientas", "unidades"],
	["Jeringas", "Medicamentos", "unidades"],
	["Baterías", "Otros", "unidades"],
	["Empaquetado", "Voluntariado", "personas"],
	["Camión", "Transporte", "toneladas"],
	["Cargar", "Voluntariado", "personas"],
];
let dats = dummydata.map((e, index) => {
	return  {
		id: index,
		nombre: e[0],
		cantidad: Math.floor(Math.random()*100),
		unidad: e[2]
	}
})

let dummy = [
	{
		id: 23290309,
		beneficiario: 'Cruz Roja Sucursal Saltillo',
		eta: '2 horas',
		createdAt: moment().format('LLL'),
		needs: dats.slice(0, Math.floor(Math.random() * dats.length-1)),
		status: 'En Camino'
	},
	{
		id: 2034912,
		beneficiario: 'Cruz Roja Sucursal Monterrey',
		eta: '4.5 horas',
		createdAt: moment().format('LLL'),
		needs: dats.slice(0, Math.floor(Math.random() * dats.length-1)),
		status: 'En Camino'
	},
	{
		id: 4579235,
		beneficiario: 'Caritas Sucursal Polanco',
		eta: '6 horas',
		createdAt: moment().format('LLL'),
		needs: dats.slice(0, Math.floor(Math.random() * dats.length-1)),
		status: 'Recibida'
	},
	{
		id: 45209372,
		beneficiario: 'Cruz Roja Sucursal Querétaro',
		eta: '2 horas',
		createdAt: moment().format('LLL'),
		needs: dats.slice(0, Math.floor(Math.random() * dats.length-1)),
		status: 'Recibida'
	},
	{
		id: 40592309,
		beneficiario: 'Cruz Roja Sucursal Monterrey',
		eta: '4.5 horas',
		createdAt: moment().format('LLL'),
		needs: dats.slice(0, Math.floor(Math.random() * dats.length-1)),
		status: 'Recibida'
	},
	{
		id: 972487,
		beneficiario: 'Caritas Sucursal Polanco',
		eta: '6 horas',
		createdAt: moment().format('LLL'),
		needs: dats.slice(0, Math.floor(Math.random() * dats.length-1)),
		status: 'Recibida'
	},
]

export default class AlphaTable extends React.Component {
	parseNeeds() {
		let needs = dummy[0].needs;
		return needs.map(d => [
		        {
		          type: "Label",
		          value: d.nombre,
		          key: "nombre"
		        },
		        {
		          type: "Label",
		          value: d.cantidad,
		          key: "cantidad"
		        },
		        {
		          type: "Label",
		          value: d.unidad,
		          options: [d.unidad],
		          key: "unidad"
		        }
		])
	}
	getTrigger(index) {
		return (
			<div>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="to-name">{dummy[index].beneficiario}</TableCell>
							<TableCell>
								<div style={{marginBottom: 10}}>Tiempo estimado: {dummy[index].eta} horas</div> 
								<div>{dummy[index].createdAt}</div> 
							</TableCell>
							<TableCell> <p className="status">{dummy[index].status}</p> </TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}
	render() {
		return (
			<div className="AlphaTable">
				<Paper>
					<Table>
						<TableHead>
							<TableRow className="main-header">
								<TableCell>{this.props.type === "beneficiary"? 'Originario': 'Destinatario'}</TableCell>
								<TableCell>Tiempos estimados</TableCell>
								<TableCell>Estatus</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{dummy.map((d, index) => 
								<TableRow>
								<TableCell colSpan={3}>
									<Collapsible className="hello" trigger={this.getTrigger(index)} transitionTime={300}>
										<div className="cf innerTable">
											<div className="left">
												<Table>
													<TableHead>
														<TableRow>
															<TableCell>Recurso</TableCell>
															<TableCell>Cantidad</TableCell>
															<TableCell>Unidad</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{this.parseNeeds().map((n, index) => <CustomRow need={n} key={index} />)}
													</TableBody>
												</Table>
											</div>
											<div className="right">
												<div>
													<Button className="pdf-button" style={{width: '50%', marginBottom: 20}} raised>{this.props.type === "collectionCenter" ? "Ver PDF" : "RECIBIDO"}</Button>
													<br/>
													<Button className="cancel-button" style={{width: '50%'}} raised>{"Cancelar"}</Button>
													<br/>
												</div>
											</div>
										</div>
									</Collapsible>
								</TableCell>
							</TableRow>
							)
							}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}