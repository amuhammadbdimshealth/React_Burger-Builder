import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={classes.Less}
                onClick={props.clickLess}
                disabled={props.disabledInfo}>                
                Less
            </button>
            <button 
                className={classes.More}
                onClick={props.clickMore}>
                More
            </button>
            <div className={classes.Counter}>{props.count}</div>
        </div>
    );
};

export default buildControl;