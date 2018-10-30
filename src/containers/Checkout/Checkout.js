import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
// import Spinner from '../../components/UI/Spinner/Spinner'

// import axios from '../../axios-orders'

import { connect } from 'react-redux'
// import * as checkOutActions from '../../store/actions/index'


class Checkout extends Component {

    // state = {
    //     ingredients: {
    //         salad: 0,
    //         meat: 0,
    //         cheese: 0,
    //         bacon: 0
    //     },
    //     totalPrice: null
    // }

    componentWillUpdate(nextProps, nextState) {
        // debugger
        // console.log("[Checkout.js] => componentWillUpdate", nextState)
    }

    componentDidUpdate() {
        // console.log("[Checkout.js] => componentDidUpdate")
    }

    componentWillMount() {
        // this.props.onInitPurchase();
        // this.setState({test: !this.state.test})
        // console.log(this.props);
    }

    componentDidMount() {
        // console.log("[Checkout.js] => componentDidMount", this.props)

        // Redux : now we dont need the following code
        /*
        if (this.props.location.state.parentState) {
            const parentState = this.props.location.state.parentState;
            const ingredients = parentState.ingredients;
            const totalPrice = parentState.totalPrice;
            this.setState({ ingredients: ingredients, totalPrice: totalPrice });
        }
        */
    }

    checkoutCancelHandler = () => {
        // console.log("Cancel Checkout", this.props)
        this.props.history.goBack('/');

    }

    checkoutContinueHandler = () => {
        // this.props.history.replace(this.props.match.path + '/contact-data');
        this.props.history.replace({
            pathname: this.props.match.path + '/contact-data',
            // state: { checkoutState: this.state }
        });
    }

    render() {
        let checkoutSummary = null;
        debugger
        // const purchasedRedirect =  this.props.purchased ? <h1>PURCHASED: TRUE</h1> : <h1>PURCHASED: FALSE</h1> 
        
        // const test =  this.state.test ? <h1>TEST: TRUE</h1> : <h1>TEST: FALSE</h1>
        // this.props.purchased ? <Redirect to='/' /> : null;

        if (this.props.ingrs) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            checkoutSummary =
                <div>
                    {purchasedRedirect}
                    
                    <CheckoutSummary
                        ingredients={this.props.ingrs}
                        clickCancel={this.checkoutCancelHandler}
                        clickContinue={this.checkoutContinueHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>

        } else checkoutSummary = <Redirect to='/'></Redirect>
        return (
            checkoutSummary
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingrs: state.brgr.ingredients,
        purchased: state.cnct.purchased
    };
}


export default connect(mapStateToProps)(Checkout);