import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => {
    let sideDrawerClasses = props.open ?
        [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close]
    return (
        <Aux>
            <div className={classes.Backdrop}>
                <Backdrop show={props.open} clicked={props.closed} />
            </div>
            <div className={sideDrawerClasses.join(" ")} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.NavigationItems}>
                    <NavigationItems
                        isAuth={props.isAuthenticated} />
                </nav>

            </div>
        </Aux>
    );
};

export default sideDrawer;