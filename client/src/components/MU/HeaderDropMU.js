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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sizeFont: {
    fontSize: 16,
    fontFamily: 'Montserrat',    

  },
  butt: {
    fontSize: 20,
    fontWeight: 400,
    textTransform: 'none',
    fontFamily: 'Montserrat',
    // color: '#dae8f1',
    "&:hover": {
      border: 'none',
      color: 'blue'
    }
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
        userInfo ? (
          <div>
            <Button className={classes.butt}
              ref={anchorRef}
              // aria-controls={open ? 'menu-list-grow' : undefined}
              // aria-haspopup="true"
              onClick={handleToggle}
            >
              {userInfo.name}<ArrowDropDownIcon />
            </Button>


            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
            // перекрывает
            style={{zIndex:1000}}
            >
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
                        
                        {!userInfo.isAdmin &&
                          <MenuItem className={classes.sizeFont}
                            onClick={handleClose}>
                            <Link to="/orderhistory">Мои заказы</Link>
                          </MenuItem>
                        }

                        {userInfo.isAdmin &&
                          <>
                            <MenuItem className={classes.sizeFont}
                              onClick={handleClose}>
                              <Link to="/orders">Все заказы</Link>
                            </MenuItem>
                            <MenuItem className={classes.sizeFont}
                              onClick={handleClose}>
                              <Link to="/colors">Цвета для дверей</Link>
                            </MenuItem>
                          </>
                        }


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
        ) : (
          <Link className="header__link" to="/signin">Войти</Link>
        )
      }
    </div>
  );
}
