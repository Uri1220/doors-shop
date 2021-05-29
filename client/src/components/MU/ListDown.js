/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Descript from '../my/Descript';

const breadcrumbNameMap = {
  '/desc': 'Описание',
  '/comp': 'Комплектующие',
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText style={{fontSize:30}} primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};
///////MU styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // margin: theme.spacing(4),
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  headerItem: {
    // fontSize: 20,
  },
  // nested: {
  //   paddingLeft: theme.spacing(4),
  //   backgroundColor:'blue',
  // },
}));
//------

export default function ListDown({ des, poz }) {

  ///////////////////     
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <MemoryRouter >
      {/* // */}
      <div className={classes.root}>
        {/* // */}
        <nav className={classes.lists} aria-label="mailbox folders">
          <List>
            <ListItemLink className={classes.headerItem}
              to={poz ? '/desc' : '/comp'}
              open={open}
              onClick={handleClick}
            />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <Descript des={des} />
            </Collapse>


          </List>
        </nav>
      </div>
    </MemoryRouter>
  );
}
