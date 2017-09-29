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
				nombre: "Agua",
				cantidad: 3,
				unidad: "Litros",
			},
			{
				id: 2,
				nombre: "Atun",
				cantidad: 100,
				unidad: "Gramos",
			},
			{
				id: 3,
				nombre: "Cobijas",
				cantidad: 3,
				unidad: "unidades",
			}
		]
	}
]

export default class SavedForLater extends React.Component {



	parseNeeds() {
		let needs = dummy[0].needs;
		return needs.map(d => [
		        {
		          type: "Label",
		          value: d.nombre,
		          key: "nombre"
		        },
		        {
		          type: "NumberField",
		          value: d.cantidad,
		          key: "cantidad"
		        },
		        {
		          type: "Label",
		          value: d.unidad,
		          options: [d.unidad],
		          key: "unidad"
		        },
		        {
        			type: "Delete"
		        }
		])
	}

	getTrigger() {
		return (
			<div>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="to-name">San Juan Bosco</TableCell>
							<TableCell>
								<div>10 art&iacute;culos</div> 
							</TableCell>
							<TableCell> 
								<Button className="send-button" style={{width: '30%'}} raised>Enviar
								</Button> 
							</TableCell>
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
								<TableCell>Beneficiario</TableCell>
								<TableCell>Cantidad de art&iacute;culos</TableCell>
								<TableCell></TableCell>
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
															<TableCell>Borrar</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{this.parseNeeds().map((n, index) => <CustomRow need={n} key={index} />)}
													</TableBody>
												</Table>
											</div>
											<div className="right">
												<Button className="pdf-button" style={{width: '50%'}} raised>Guardar</Button>
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