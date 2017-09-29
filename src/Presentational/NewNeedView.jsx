import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import CustomRow from "../Containers/CustomRow";
import {Table} from "material-ui";
import {TableBody} from "../../node_modules/material-ui/Table/index";

export default class NewNeedView extends Component {
    state = {expanded:false};

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleChange(updatedNeed, id) {
        this.data[id] = updatedNeed;
    }

    addNeed(){
        //add need
    }

    componentWillMount() {
        // const { userId, getNeeds } = this.props
        // getNeeds(userId)
        this.needs = [
            {
                id: 1,
                nombre: "Benis",
                cantidad: 0,
                unidad: "Muchos",
            }
        ];

        this.data = this.needs;

        this.fields = this.data.map(d => [
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
                    type: "FuzzySearch",
                    value: d.unidad,
                    options: [d.unidad],
                    key: "unidad"
                },
                {
                    type: "Add",
                }
            ]
        )
    }
  render() {
    return (
        <div>
            <Card onClick={this.handleExpandClick}>
                <CardContent>
                    <Typography type='headline'>
                        BENIS
                    </Typography>
                </CardContent>
            </Card>
            <Collapse in={this.state.expanded}>
                <Card>
                    <CardContent>
                        <Table >
                            <TableBody>
                                {
                                    this.fields.map((n, index) => <CustomRow need={n} id={index} handleChange={this.handleChange} addAction={this.addNeed}/>)
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Collapse>
        </div>
    )
  }
}