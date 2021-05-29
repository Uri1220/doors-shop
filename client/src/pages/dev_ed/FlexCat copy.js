import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { signout } from '../../redux/actions/userA'




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sizeFont: {
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  butt: {
    fontSize: 14,
    textTransform: 'none',
    fontFamily: 'Montserrat',
    cursor: 'pointer'
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);


  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const signoutHandler = () => {
    dispatch(signout());
  }


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
 {   
  // (
      <div>
        <Button className={classes.butt}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          { userInfo? userInfo.name :'Войти'}
        </Button>


        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem className={classes.sizeFont}
                      onClick={handleClose}>
                      <Link to="/profile">Мой профиль</Link>
                    </MenuItem>
                    <MenuItem  className={classes.sizeFont}
                    onClick={handleClose}>
                      <Link to="/orderhistory">Мои заказы</Link>
                    </MenuItem>
                    <MenuItem  className={classes.sizeFont}
                    onClick={handleClose}>
                      <Link to="/colors">DoorColors</Link>
                    </MenuItem>
                    <MenuItem className={classes.sizeFont} 
                    onClick={handleClose}>
                      <Link to="#signout" onClick={signoutHandler}>
                        Выйти
                    </Link>
                    </MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>



      </div>
      //  ) : (

      //   <Button className={classes.butt}
      //   ref={anchorRef}
      //   aria-controls={open ? 'menu-list-grow' : undefined}
      //   aria-haspopup="true"
      //   onClick={handleToggle}
      // >
      //  <Link className="header__link" to="/signin"></Link>

      // </Button>
        
      //   )
    }
    </div>
  );
}
