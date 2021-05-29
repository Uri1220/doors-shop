import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({

  formControl: {
    // margin: theme.spacing(1),
    minWidth: 190,
  },
  //размер шрифта
  sizeFont: {
    fontSize: 16,
    fontFamily:'Montserrat',
  }
}));

export default function SelectMU({ age, setAge, arr,title }) {

  const classes = useStyles();
  //Должно быть в родителе
  // const [age, setAge] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.sizeFont}
          id="demo-controlled-open-select-label">{title}
           </InputLabel>
        <Select
          className={classes.sizeFont}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          // defaultValue={age}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          {
            arr.map(el =>
              <MenuItem key={el.id}
                className={classes.sizeFont}
                value={el.ag}
              >
                {el.name}
              </MenuItem>

            )
          }
          {/* <MenuItem className={classes.sizeFont} value={10}> Все</MenuItem>
        <MenuItem className={classes.sizeFont} value={20}>Доставленные</MenuItem>
        <MenuItem className={classes.sizeFont} value={30}>Не Доставленные</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  )
}

