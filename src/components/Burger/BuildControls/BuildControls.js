import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import { withRouter } from 'react-router-dom'

const buildControls = (props) => {
    /*function signup() {
        // console.log(props)
        props.history.push('/auth')
    }
    const orderButton = props.isAuthenticated ?
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.order}>
            ORDER NOW
        </button>
        :
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={signup}>
            SIGN UP TO ORDER
        </button>
    */
    const distinctIngredients = Object.keys(props.ingredients)
    //{salad :true, bacon: false, meat:true}
    return (
        <div className={classes.BuildControls}>
            <div className={classes.Price}>Price ${props.price.toFixed(2)}</div>
            {distinctIngredients
                .map(ingKey =>
                    <BuildControl
                        key={ingKey}
                        label={ingKey}
                        count={props.ingredients[ingKey]}
                        clickMore={props.ingredientAdded.bind(this, ingKey)}
                        clickLess={props.ingredientRemoved.bind(this, ingKey)}
                        disabledInfo={props.disabledInfo[ingKey]}
                    />
                )
            }
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.order}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
}

export default withRouter(buildControls);


