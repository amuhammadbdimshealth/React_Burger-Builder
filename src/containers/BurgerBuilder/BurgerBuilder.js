import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'


export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purchasing: false,
            // isLoading: false,
            // error: false
        }
    }
    componentWillUpdate() {
        //debugger
        // console.log("[BurgerBuilder.js] => componentWillUpdate")
    }

    componentDidUpdate() {
        //debugger
        // console.log("[BurgerBuilder.js] => componentDidUpdate", this.props.ingrs, this.props.prc)
    }

    componentWillMount() {
        //debugger
        // console.log("[BurgerBuilder.js] => componentWillMount")

    }

    componentDidMount() {
        // debugger
        // console.log("[BurgerBuilder.js] => componentDidMount", this.props);

        /** Redux - approach-1 - Retrieve ingredients from backend
         * axios.get("/ingredients.json")
            .then(response => {
                console.log(response.data);
                // this.setState({ ingredients: response.data });
                this.props.resetStateOnPlaceOrder(response.data);
            })
            .catch(error => this.setState({ error: true })); 
         */

        /** Redux - approach-2 - Retrieve ingredients from backend
         * Using action creators to retrieve data first in the Redux central store and initialise the state 
        */
        
        this.props.onInitIngredients();

        // this.props.onSetAuthRedirectPath('/') // since mounting the burger builder means we have not started buidling anything. So after sign up user should redirect to root page.
    }

    updatePurchaseState() {
        // debugger
        const ingredients = { ...this.props.ingrs };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    }

    addIngredientHandler = (ingKey) => {
        // Redux :             
        this.props.onIngredientAdd(ingKey);
    }

    removeIngredientHandler = (ingKey) => {
        // Redux : 
        const hasIngredients = this.props.ingrs[ingKey] > 0
        if (hasIngredients) this.props.onIngredientRemove(ingKey);
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })
        }else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        // console.log("[BurgerBuilder.js] purchaseHandler after setState({})")
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // call reducer action to set purchased = false everytime user goes to the checkout page
        this.props.onInitPurchase();

        // Route to Checkout page
        // console.log(this.props);
        this.props.history.push({
            pathname: '/checkout'
            // state: { parentState: this.state } 

            // Redux : now we dont have to pass the this.state through router to the Checkout component 
        });
    }

    calculateCourseProgess() {
        var times = document.getElementsByClassName('curriculum-item--duration--1OEOp');
        var split = Array.from(times).map(delimited => delimited.innerText.split(':'))
        var eachVidSec = split.map(s => s[0] !== "" ? Number(s[0]) * 60 + Number(s[1]) : 0);
        var sumSec = eachVidSec.reduce((t, v) => t + v, 0)
    }

    render() {
        //debugger    
        // console.log("[BurgerBuilder.js] => render()")
        const ingredients = this.props.ingrs;
        // const isloading = this.state.isLoading;
        const totalPrice = this.props.prc || 0
        const disabledInfo = {
            ...this.props.ingrs
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        /**
         *until we receive the ingredients from backend the jsx will not be using ingredients as state or props to render themselves. Otherwise it throws error. Ingredients are only loaded in componentDidMount Life cycle hook after the first render() call. 
         */
        let orderSummary, burger, buildControls = null;
        if (ingredients) { //ingredients are availble from backend
            orderSummary =
                <OrderSummary
                    ingredients={ingredients}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    totalPrice={totalPrice} />

            burger = <Burger ingredients={ingredients} />;
            buildControls =
                <BuildControls
                    isAuthenticated={this.props.isAuthenticated}
                    ingredients={ingredients}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={totalPrice}
                    purchasable={this.updatePurchaseState()}
                    order={this.purchaseHandler}
                />
        } else if (this.props.error) {
            //Error has occurred while geting the ingredients
            orderSummary = <p>No Ingredients Could be Loaded</p>
            burger = <p>No Ingredients Could be Loaded</p>
            buildControls = <p>No Ingredients Could be Loaded</p>
        } else {
            //waiting for ingredients
            orderSummary = <Spinner />
            burger = <Spinner />
            buildControls = <Spinner />
        }


        return (
            <Aux>

                <Modal
                    show={this.state.purchasing}
                    modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                {buildControls}
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ingrs: state.brgr.ingredients,
        prc: state.brgr.totalPrice,
        error: state.brgr.error,
        isAuthenticated: state.auth.token != null        
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onIngredientAdd: (ingKey) => { dispatch(actions.addIngredient(ingKey)) },
        onIngredientRemove: (ingKey) => { dispatch(actions.removeIngredient(ingKey)) },
        onInitIngredients: () => { dispatch(actions.initIngredients()) },
        // resetStateOnPlaceOrder: (data) => { dispatch(actions.resetState(data)) },
        onInitPurchase: () => { dispatch(actions.purchaseInit())},
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

// BurgerBuilder = connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder); //this is correct but using this causes the test cases to fail - dont know why. need to debug.


// export default withErrorHandler(BurgerBuilder, axios);
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

/**
 * we can see error handling with our higher order components still works due to us using one and the same axios instance
 */