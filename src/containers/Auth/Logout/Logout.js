import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/index'

class Logout extends Component {

    componentDidMount() {
        //..dispatch action 
        // console.log("[Logout.js] => componentDidMount")
        this.props.onLogout();                
    }

    componentWillUpdate() {
        // console.log("[Logout.js] => componentWillUpdate")
    }
    render() {
        // console.log("[Logout.js] => render")
        return (
            <div>
                {/* redirect to the burger builder page */}
                <Redirect to='/'/>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => { dispatch(actions.logout()) }
    };
}
export default connect(null, mapDispatchToProps)(Logout);