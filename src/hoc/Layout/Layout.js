import React from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux/Aux';
import classes from '../Layout/Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
// import Backdrop from '../../components/UI/Backdrop/Backdrop'


class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })

    }
    sideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true })
    }
    sideDrawerToggleHandler = () => {
        // cleaner way to change state when it is dependant on the old state. Otherwise due to the asynchoronous nature of state unexpected results might follow.
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }
    render() {
        return ( 
            <Aux>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    toggle={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
        // }

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    };
}

export default connect(mapStateToProps, null)(Layout);