import React from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'
// import axios from '../../axios-orders'

/**
 * Now obviously we only want to show this if we got an error so we need to set show to something else and that something else needs to come from the wrapped component we need that information.If it did fail to get that information, we should add a second argument to our higher order function here,The axios instance which was used so that we can set up an error handler, a global error handler on it. 
 */
const withErrorHandler = ( WrappedComponent ,axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillUpdate() {
            //debugger
            // console.log("[withErrorHandler.js] => componentWillUpdate")
        }
    
        componentDidUpdate() {
            //debugger
            // console.log("[withErrorHandler.js] => componentDidUpdate")
        }

        componentWillMount() {
            //debugger
            // console.log("[withErrorHandler.js] => componentWillMount")
            this.reqInterceptor = axios.interceptors.request.use( req => {                
                // debugger
                // console.log('[withErrorHandler.js] Interceptor requestCfg', req);         
                this.setState({error: null});
                // debugger
                return req; //must return the requestCfg otherwise you are blocking the request
            }, error => {
                //debugger
                // console.log('[withErrorHandler.js] Interceptor request error', error);
            });
            this.resInterceptor = axios.interceptors.response.use( res => {
                //debugger
                // console.log('[withErrorHandler.js] Interceptor responseCfg', res);
                return res; //must return the responseCfg otherwise you are blocking the response
            }, error => {                
                // console.log('[withErrorHandler.js] Interceptor response error', error);
                // debugger
                this.setState({ error: error})
                // debugger
            })
        } 

        componentDidMount() {
            // debugger
            // console.log("[withErrorHandler.js] => componentDidMount")       
        }

        /**
         * The problem we have is if we add this higher order component withErrorHandler to other components, we'll call componentWillMount again and again of course because the class component we return in this higher order component is created every time this is wrapped around an existing component. So we're actually attaching multiple interceptors in our application and we're attaching them to the same axios instance.
         * The mentioned routing will lead to the problem once we have more pages where we might use withErrorHandler
         * So all the interceptors we set up when we wrapped this around another component which might not be needed anymore still exist. So we have a lot of dead interceptors sitting in memory which actually are not dead but which still react to our requests and in the worst case they lead to errors or do somehow change the state of our application.But even in the best case, they leak memory because that's code that still runs that is not required anymore.
         * So we should actually remove the interceptors when this component gets unmounted.So when this specific instance of our withErrorHandler wrapper is not needed anymore
         * 
         */
        componentWillUnmount() {
            // debugger
            // console.log("[withErrorHandler.js] => componentWillUnmount",this.reqInterceptor,this.resInterceptor);      
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);


        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            //debugger
            // console.log("[withErrorHandler.js] => render()")
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClose={this.errorConfirmedHandler}>                        
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
        
    } 
    
}
export default withErrorHandler;