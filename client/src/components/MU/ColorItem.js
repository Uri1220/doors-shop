import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 60,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '8px',
    lineHeight: 1.5,
    borderColor: '#eee',
    '&:hover': {
      border: 'none',
      opacity: 'none',
    },
  }
}));

export default function ColorItem({item}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Delete
  const deleteHandler = () => {
  };

  return (
    <Card className={classes.root}>
      <CardHeader
       
        action={
          <IconButton
          aria-label="delete"
          className={classes.button}
          color="secondary"
          onClick={() => deleteHandler()}>
           <DeleteIcon/>
          </IconButton>
        }
        title={item.colorName}
      />
      <CardMedia
        className={classes.media}
        image={item.colorUrl}
      />
      
    </Card>
  );
}