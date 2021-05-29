import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioColors({value,handleChange}) {
  // const [value, setValue] = React.useState('door');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  // console.log('v',value)

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Gender</FormLabel> */}
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="door" control={<Radio />} label="Для дверей" />
        <FormControlLabel value="pen" control={<Radio />} label="Для ручек" />
        <FormControlLabel value="plint" control={<Radio />} label="Для плинтуса" />
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
    </FormControl>
  );
}
