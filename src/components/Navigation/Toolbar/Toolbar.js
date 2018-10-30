import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return (
        <div className={classes.Toolbar}>            
            <DrawerToggle clicked={props.toggle}/>            
            <div className={classes.Logo}>          
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuthenticated}/>
            </nav>
            
            {/* <Logo logoImg={props.logoImage}/> */} 
            {/* <Nav navList={props.navList}/> */}
        </div>
    );
};

export default toolbar;

