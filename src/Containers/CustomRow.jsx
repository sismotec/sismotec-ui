import React, {Component} from 'react';

import {TableCell, TableRow } from 'material-ui/Table';

import FuzzySearch from '../Presentational/CustomRow/FuzzySearch';
import Label from '../Presentational/CustomRow/Label';
import NumberField from '../Presentational/CustomRow/NumberField';
import Delete from '../Presentational/CustomRow/Delete';
import Add from "../Presentational/CustomRow/Add";
import Button from 'material-ui/Button';



export default class CustomRow extends Component {
  constructor(props) {
    super(props);
    this.data = {...props.data};
  }

  handleChange(value, key) {
    this.data[key] = value;
    this.props.handleChange(this.data, this.props.id);
  }

  renderField(item) {
    switch (item.type) {
      case 'FuzzySearch':
          return <FuzzySearch onChange={(value) => this.handleChange(value, item.key)}
                        label={item.value}
                        data={item.options}/>
      case 'Label':
        return <Label value={item.value}/>
      case 'NumberField':
        return <NumberField onChange={(value) => this.handleChange(value, item.key)}
                        value={item.value}/>
      case 'Delete':
        return <Delete onClick={() => this.props.deleteAction(this.props.id)}/>
      case 'Button':
        return (
        <Button {...item.props} onClick={() => {return item.onClick && this.props[item.onClick] ? this.props[item.onClick].call(this) : (_ => {return;})(); }}>
          {item.label ? item.label : 'No label passed'}
        </Button>);
      case 'Add':
        return <Add onClick={() => this.props.addAction(this.props.id)}/>
      default:
        break;
    }
  }

  render() {
    return <TableRow>
        {this.props.need.map(n => {
          return <TableCell key={n.key}>
            {this.renderField(n)}
          </TableCell>
        })}
      </TableRow>
  }
}