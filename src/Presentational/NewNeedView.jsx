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
        console.log(this.props);

        this.data = {...this.props.item};
        console.log('hhhh', this.data)
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
    }
  render() {
    return (
        <div>
            <Card onClick={this.handleExpandClick}>
                <CardContent>
                    <Typography type='headline'>
                        {this.props.item.nombre}
                    </Typography>
                </CardContent>
            </Card>
            <Collapse in={this.state.expanded}>
                
                    <CardContent>
                        <Table >
                            <TableBody>
                                <CustomRow need={this.fields} id={0} handleChange={this.handleChange} addAction={this.addNeed}/>
                            </TableBody>
                        </Table>
                    </CardContent>

            </Collapse>
        </div>
    )
  }
}