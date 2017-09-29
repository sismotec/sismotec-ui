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

export default class SavedForLater extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteNeed = this.deleteNeed.bind(this);
        this.data = [];
        this.dialogActions = null;
        this.tableHeader = null;
        this.tableFooter = null;

        this.dummy=
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
            };

        this.state = {
            field: []
        };

        console.log(this.dummy);
        console.log(this.dummy.needs);

        this.data = this.dummy.needs.map(d => ({
            ...d,
        }));

        this.state.fields = this.dummy.needs.map(d => [
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
        ]);
    }

    handleChange(updatedNeed, id) {
        this.data[id] = updatedNeed;
        // this.props.handleChange(this.data, this.props.profile.id_propietario);
    }

    deleteNeed(index) {
        this.props.deleteNeed(this.data[index], this.dummy.id);

        var newFields = this.state.fields.slice(); //copy array
        newFields.splice(index, 1); //remove element
        this.setState({fields: newFields}); //update state
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
														{this.state.fields.map((n, index) => <CustomRow data={this.data[index]} need={n} id={index} handleChange={this.handleChange} deleteAction={this.deleteNeed}/>)}
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