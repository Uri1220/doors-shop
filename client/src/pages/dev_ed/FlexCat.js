import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

      // width: '25ch',//применится на все кнопки
    },
  },
  form: {
    margin: theme.spacing(1),

  },
  input: {
    margin: theme.spacing(1),
     width: '20ch',
    fontSize: 16,
    '& .MuiInputBase-root ': {
      fontSize: 16,
    },
    '& .MuiFormLabel-root': {
      fontSize: 16,
      // fontFamily: "Helvetica Arial sans-serif"
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },

  },

  divider: {
    height: 28,
    margin: 4,
  },

  button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '8px',
    // padding: '6px 12px',
    // border: '1px solid',
    lineHeight: 1.5,
    // backgroundColor: '#0063cc',
    borderColor: '#eee',
    // fontFamily:'Helvetica',
    '&:hover': {
      border: 'none',
      opacity: 'none',
      // backgroundColor: '#ffebee',
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  },





}));

export default function DelButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        // iconSizeLarge
        disableElevation
        size="small"

        color="secondary"
        className={classes.button}
        startIcon={
          <DeleteIcon
            fontSize="small"
          />
        }
      >
        Delete
      </Button>
      <Button color="primary">Primary</Button>

      <Button onClick={() => { alert('clicked') }}>Click me</Button>
      {/* ///////////////////////////////////////////////////// */}
      <IconButton
        aria-label="delete"
        className={classes.button}
        color="secondary"
      // color="#eee"
      // onClick={() => { alert('clicked') }}
      >
        <DeleteIcon fontSize="large" />

      </IconButton>

      {/* ////////////////////////////////////////////////////////////// */}
      <IconButton
        color="primary"
        className={classes.button}
        aria-label="directions">
        <DirectionsIcon />
      </IconButton>

      <Divider className={classes.divider} orientation="vertical" />
      {/* //////////////////////////////////// */}

      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          type="search"
          required
          id="standard-basic"
          label="Standard"
          defaultValue="Default Value"
          helperText="Some important text"
          //  onChange={(e) => setTitle(e.target.value)}
          className={classes.input}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          className={classes.input}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: false,
          }}
          variant="outlined"
        />

        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>





    </div>
  );
}