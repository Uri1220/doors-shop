import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Backdrop from '@material-ui/core/Backdrop';



const useStyles = makeStyles((theme) => ({
  root: {
     display: 'flex',
  },
  sizeFont: {
    fontSize: 14,
    fontFamily: 'Montserrat',

  },
  img: {
    height: 30,
    width: 30
  },
  butt: {
    fontSize: 15,
    height:'100%',
    fontWeight: 400,
    textTransform: 'none',
    fontFamily: 'Montserrat',
    //  color: '#dae8f1',
    "&:hover": {
      border: 'none',
      color: 'blue'
    }
  },
  paper: {
    marginRight: theme.spacing(2),

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setOpen1(!open1);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    setOpen1(false);
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
      <div>
        <Button className={classes.butt}
          ref={anchorRef}
          // aria-controls={open ? 'menu-list-grow' : undefined}
          // aria-haspopup="true"
          onClick={handleToggle}
        >
          <LocationOnIcon color="primary" />
          <p>Где купить?</p>
          {/* <ArrowDropDownIcon /> */}
        </Button>

        <Backdrop className={classes.backdrop} open={open}
          onClick={handleClose}
         >


        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
         //добавил
         placement='right'
         style={{marginTop:85}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem className={classes.sizeFont}>
                      <div style={{ display: 'flex', alignItems: 'center' }} >
                        <img className={classes.img} src="https://brand.a1.group/wp-content/themes/a1-brand-portal/public/logo.jpg" alt="A1 " />

                        <div className={classes.sizeFont}>+375 (29) 000-00-00</div>
                      </div>

                    </MenuItem>
                    <MenuItem className={classes.sizeFont}>
                      <div style={{ display: 'flex', alignItems: 'center' }} >
                        <img className={classes.img} src="https://img.apksum.com/ab/ru.mts.mymts/5.13/icon.png" alt="MTS Brand " />

                        <div className={classes.sizeFont}>+375 (29) 000-00-00</div>
                      </div>

                    </MenuItem>
                    <MenuItem className={classes.sizeFont}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon />
                        <div style={{ marginLeft: 10 }}>
                          <p>г. Минск, пр. Независимости,</p>
                          <p>00Г, офис 00</p>
                        </div>
                      </div>

                    </MenuItem>
                    <MenuItem className={classes.sizeFont}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon />                        
                        <div style={{marginLeft:10}}>
                          <p>Пн-Пт: 9:00-20:00</p>
                          <p>Сб: 10:00-16:00</p>
                          <p>Вс: выходной</p>
                          <p><b>ЗВОНКИ ПРИНИМАЕМ </b></p>
                          <p><b>ВСЕ ДНИ НЕДЕЛИ: С 9:00 ДО 22:00</b></p>
				              	</div>
                        </div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </Backdrop>

      </div>
    </div>
  );
}
