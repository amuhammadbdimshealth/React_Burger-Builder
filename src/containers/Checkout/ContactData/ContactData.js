import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Aux from '../../../hoc/Aux/Aux'
import Input from '../../../components/UI/Forms/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as contactDataActions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        // Redux : now we dont need this slice of the state from checkout. As Redux provides us with  a Central Storage State
        /*checkoutState: {
            name: null,
            email: null,
            address: {
                street: null,
                postal: null
            },
            ingredients: null,
            totalPrice: null

        },*/

        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    label: 'Name',
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    label: 'Street',
                    type: 'text',
                    name: 'street',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    label: 'Country',
                    type: 'text',
                    name: 'country',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    label: 'ZipCode',
                    type: 'text',
                    name: 'postal',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    label: 'Email',
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    label: "Select Delivery Method",
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,

            }

        },
        // isLoading: false,
        isFormValid: false

    }
    componentDidMount() {
        // console.log("[ContactData.js] => componentDidMount", this.props)

        // Redux : now we dont need this slice of the state from checkout. As Redux provides us with Central Storage State

        /*const checkoutState = this.props.location.state.checkoutState;
        let contactDataState = { ...this.state };
        contactDataState.checkoutState.ingredients = checkoutState.ingredients;
        contactDataState.checkoutState.totalPrice = checkoutState.totalPrice

        this.setState({ ingredients: checkoutState.ingredients, totalPrice: checkoutState.totalPrice });
        this.setState({ contactDataState });
        */
    }
    componentDidUpdate() {
        // console.log("[ContactData.js] => componentDidUpdate", this.props, this.state)
    }

    placeOrderHandler = (e) => {
        e.preventDefault();

        //Arif Code
        // this.props.changeLoadingStatus();

        const formData = {};
        Object.keys(this.state.orderForm).forEach(formElementIdentifier => {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        })

        const order = {
            ingredients: this.props.ingrs,
            price: Number(this.props.prc).toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }

        // Arif Code
        // this.props.onPlaceOrder(order);

        // Max Code
        this.props.onOrderBurger(order, this.props.token);
        

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ isLoading: false }); //console.log(response);
        //         this.props.history.replace('/');
        //     })
        //     .catch(error => {
        //         this.setState({ isLoading: false }); //console.log(error);
        //     })
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) return true;

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }

        if (rules.minlength) {

            isValid = isValid && (value.length >= rules.minlength);
        }

        if (rules.maxLength) {

            isValid = isValid && (value.length <= rules.maxLength);
        }

        return isValid;
    }
    isFormValid = (updatedOrderForm) => {
        const keys = Object.keys(updatedOrderForm)
        let isFormValid = true;
        keys.forEach(formElement => {
            isFormValid = isFormValid && updatedOrderForm[formElement].valid
        })
        // console.log(isFormValid);
        return isFormValid;
    }

    inputChangedHandler = (event, formElementId) => {
        // console.log('this => ', this, 'event =>', event.target, 'id => ', formElementId);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[formElementId]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[formElementId] = updatedFormElement;

        const isFormValid = this.isFormValid(updatedOrderForm);

        // console.log(updatedFormElement,updatedOrderForm.isFormValid);
        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
    }

    render() {
        // console.log("[ContactData.js] => render()");
        // console.log(this.state.orderForm);

        const orderForm = this.state.orderForm;
        const formElementsArray = [];

        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.placeOrderHandler}>
                {formElementsArray.map(formElement => {
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    )
                }
                )}
                <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        )
        let contactData = (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>);
        contactData = this.props.isLoading ? <Spinner /> : contactData
        return (
            <Aux>
                {contactData}
            </Aux>

        );
    }
}
const mapStateToProps = state => {
    return {
        ingrs: state.brgr.ingredients,
        prc: state.brgr.totalPrice,
        isLoading: state.cnct.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //Arif Code
        // onPlaceOrder: (order) => { dispatch(contactDataActions.placeOrder(order)) }, 
        // changeLoadingStatus: () => { dispatch(contactDataActions.toggleIsLoading) },

        // Max Code
        onOrderBurger: (orderData, token) => { dispatch(contactDataActions.purchaseBurger(orderData, token)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));


