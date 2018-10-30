import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

import Layout from './hoc/Layout/Layout'
import BurgeBuilder from './containers/BurgerBuilder/BurgerBuilder'

import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'

// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'

// Lazy loading the Component on demand - using react-loadable package
const AsyncAuth = Loadable({
    loader: () => import('./containers/Auth/Auth'),
    loading: () => <div>Loading Auth...</div>
});

const AsyncChekout = Loadable({
    loader: () => import('./containers/Checkout/Checkout'),
    loading: () => <div>Loading Chekout...</div>
});

const AsyncOrders = Loadable({
    loader: () => import('./containers/Orders/Orders'),
    loading: () => <div>Loading Orders...</div>
});

class App extends Component {

    componentWillUpdate() {        
        // debugger
        // console.log("[App.js] => componentWillUpdate")
    }

    componentDidUpdate() {
        // debugger
        // console.log("[App.js] => componentDidUpdate")
    }

    componentWillMount() {
        // debugger
        // console.log("[App.js] => componentWillMount")
    }

    componentDidMount() {
        // debugger
        // console.log("[App.js] => componentDidMount")
        this.props.onTryAutoSignIn();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/build" component={BurgeBuilder} />
                <Route path="/auth" component={AsyncAuth} />                
                <Route path="/" component={BurgeBuilder} />                
            </Switch>
        )
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/build" component={BurgeBuilder} />
                    <Route path="/checkout" component={AsyncChekout} />
                    <Route path="/orders" component={AsyncOrders} />                    
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={AsyncAuth} />   
                    <Route path="/" component={BurgeBuilder} />
                </Switch>
            )
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => { dispatch(actions.tryAutoSignIn()) }
    };
}
// export default App;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
