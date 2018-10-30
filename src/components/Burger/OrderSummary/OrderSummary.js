import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component {
    // This could be a functional component.

    componentWillUpdate() {
        // console.log("[Ordersummary.js] => componentWillUpdate")
    } 
    componentDidUpdate() {
        // console.log("[Ordersummary.js] => componentDidUpdate")
    }
    render(){
        // console.log("[Ordersummary.js] => render()")
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}> 
                    <span style={{textTransform: 'capitalize'}}> {igKey} </span> : {this.props.ingredients[igKey]} 
                    </li>
        });

        //{salad:1, cheese:2}
        //<li> Salad: 1 </li>
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h4 style={{
                        fontWeight: 'bold',
                        backgroundColor: 'rgb(243, 234, 181)',
                        padding: '10px',
                        textAlign: 'center',
                        margin: '10px 0'
                }}>Total Price ${this.props.totalPrice.toFixed(2)}</h4>

                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
    
};

export default OrderSummary;