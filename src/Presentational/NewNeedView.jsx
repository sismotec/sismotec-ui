import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import CustomRow from "../Containers/CustomRow";
import { Table } from "material-ui";
import { TableBody } from "../../node_modules/material-ui/Table/index";

export default class NewNeedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
        this.data = { ...this.props.item };
        this.fields = [
            {
                type: "Label",
                value: this.props.item.nombre,
                key: "nombre"
            },
            {
                type: "NumberField",
                value: this.props.item.cantidad,
                key: "cantidad"
            },
            {
                type: "FuzzySearch",
                value: this.props.item.unidad,
                options: [this.props.item.unidad],
                key: "unidad"
            },
            {
                type: "Add",
            }
        ]
        this.handleChange = this.handleChange.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.addNeed = this.addNeed.bind(this);
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleChange(updatedNeed, id) {
        this.data = updatedNeed;
    }

    addNeed() {
        this.props.handleAdd(this.data);
    }

    render() {
        return (
            <div>
                <div>
                    <Card onClick={this.handleExpandClick}>
                        <CardContent>
                            <Typography type='headline'>
                                {this.props.item.nombre}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <br/>
                {/*<Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit  >*/}
                <div>
                    <Card>
                        <CardContent>
                            <Table >
                                <TableBody>
                                    <CustomRow data={this.data} need={this.fields} id={0} handleChange={this.handleChange} addAction={this.addNeed} />
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                {/*</Collapse>*/}
            </div>
        )
    }
}