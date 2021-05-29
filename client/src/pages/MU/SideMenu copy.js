import React from 'react'
import { makeStyles } from "@material-ui/core";

//////////SideMenu
const useStylesqq = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053',
        color:'#fff'
    }
})

const SideMenu = () => {
    const  classes  = useStylesqq();
    return (
        <div className={classes.sideMenu}>
           <h1>Side Menu</h1>
        </div>
    )
}
//////////Dialog//////

export default SideMenu;

