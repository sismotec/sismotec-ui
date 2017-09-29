import React from 'react'
import '../index.css'
import './AlphaTable.css'
import Collapsible from '../Containers/Collapsible'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import CustomRow from '../Containers/CustomRow';
import Button from 'material-ui/Button';



let dummy = [
	{
		id: 23290309,
		beneficiario: 'Lorem ipsum',
		tiempos: {
			estimado: '2 horas',
			creado: Date.now(),
		},
		needs: [
			{
				id: 1,
				nombre: "agua",
				cantidad: 3,
				unidad: "litros",
			},
			{
				id: 2,
				nombre: "atun",
				cantidad: 100,
				unidad: "gramos",
			},
			{
				id: 3,
				nombre: "cobijas",
				cantidad: 3,
				unidad: "cobijas",
			}
		]
	}
]

export default class AlphaTable extends React.Component {
	constructor() {
		super()
	}
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
	getTrigger() {
		return (
			<div>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>San Juan Bosco</TableCell>
							<TableCell>
								Tiempo estimado: 20 dias <br/>
								Fecha de env&iacute;o: 25/06/17
							</TableCell>
							<TableCell> Enviado </TableCell>
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
							<TableRow>
								<TableCell>Beneficiario</TableCell>
								<TableCell>Tiempos estimados</TableCell>
								<TableCell>Estatus</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell colSpan={3}>
									<Collapsible className="hello" trigger={this.getTrigger()} transitionTime={300}>
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
												<Button style={{width: '50%', marginBottom: 20, marginLeft: '40%'}} raised color="error">Cancelar</Button>
												<br/>
												<Button style={{width: '50%', marginLeft: '40%'}} raised color="secondary">Ver PDF</Button>
											</div>
										</div>
									</Collapsible>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}