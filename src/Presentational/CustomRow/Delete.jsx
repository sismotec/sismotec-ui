import React, {Component} from 'react';
import Button from 'material-ui/Button';

export default class Delete extends Component {
  render() {
	// return <button className="delete-button" onClick={this.props.onClick}>X</button>
	return (
	<Button onClick={this.props.onClick}>
		<img style={{width: 40, height: 40}} src={process.env.PUBLIC_URL + '/icons/delete.svg'} alt=""/>
	</Button>)
  }
}