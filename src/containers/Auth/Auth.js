import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/UI/Forms/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Auth extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    label: 'Password',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true

    }

    componentWillMount() {
        if (!this.props.isBuildingBurger) {
            this.props.onSetAuthRedirectPath('/')
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const email = this.state.controls.email.value
        const password = this.state.controls.password.value
        const isSignup = this.state.isSignup;

        this.props.onAuth(email, password, isSignup);


    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        });
        console.log(this.state.isSignup)
    }

    render() {
        const controls = this.state.controls;
        const formElementsArray = [];
        const authErrorMsg = <div>{this.props.authErrorMsg}</div>
        let authRedirect = null; //.. authRedirectPath

        if (this.props.isAuthenticated) {
             
            /*good solution*/
            // if (this.props.isBuildingBurger) {
            //     authRedirect = <Redirect to="/checkout" />
            // } else {
            //     authRedirect = <Redirect to='/' />;
            // }

            /*good solution-2*/
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
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
                <Button
                    btnType="Success"
                    clicked={this.submitHandler}>
                    {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}
                </Button>
            </form>
        )

        form = !this.props.isLoading ? form : <Spinner />


        return (
            <div className={classes.Auth}>
                {authRedirect}
                {authErrorMsg}
                {form}
                <Button
                    btnType='Danger'
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        authErrorMsg: state.auth.error,
        isAuthenticated: state.auth.token != null,
        isBuildingBurger: state.brgr.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => { dispatch(actions.auth(email, password, isSignup)) },
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);