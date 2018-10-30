import React from 'react'; 
import classes from '../NavigationItem/NavigationItem.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => {
    return (                    
            <li className={classes.NavigationItem}>
                <NavLink 
                    to={props.link}
                    activeClassName={classes.active}
                    exact
                    // className={props.active ? classes.active : null}> 
                >                    
                    {props.children}
                </NavLink>            
            </li>
                  
    );
};

export default navigationItem;