import React, {Component} from 'react';
import MaskedInput from 'react-text-mask';
import Input, { InputLabel } from 'material-ui/Input';

const TextMaskCustom = (props) => (
  <MaskedInput
    {...props}
    mask={[/\d/, /\d/, ':', /\d/, /\d/]}
    placeholderChar={'0'}
    showMask
  />
)

export default class TimePicker extends Component {
  handleChange = event => {
    var a = event.target.value.split(':');
    var miliseconds = ((+a[0]) * 3600 + (+a[1]) * 60) * 1000;
    this.props.onChange(miliseconds);
  };

  render() {
    return(
      <Input
        required
        id="time"
        label="Tiempo de llegada"
        onChange={this.handleChange}
        margin="normal"
        inputComponent={TextMaskCustom}
        style={{width: '50px'}}
      />
    )
  }
}
