import React from 'react';
import classes from './Order.css'

const order = (props) => {

    const order = props.orderInfo;

    let formattedIngredients = Object.keys(order.ingredients)
        .map(ingKey => {
            return (
                <span key={ingKey} style={{
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #ccc',
                    margin: '0 10px',
                    padding: '2px',
                    display: 'inline-block',
                    textTransform: 'capitalize'
                }}>
                    {ingKey + '(' + order.ingredients[ingKey] + ')'}
                </span>
            );

        })


    console.log({ formattedIngredients });

    return (
        <div className={classes.Order}>
            <p>Customer Name : {order.orderData.name}</p>
            <p>Ingredients: {formattedIngredients}</p>
            <p>Price: <strong>USD {Number(order.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;