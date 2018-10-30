import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class Orders extends Component {
    // state = {
    //     orders: null,
    //     isLoading: true,
    //     isError: false
    // }
    componentDidUpdate() {
        // console.log("[Ordersss.js] => componentDidUpdate")
    }
    componentDidMount() {
        // console.log("[Ordersss.js] => componentDidMount")
        // get the orders from DB 

        // axios.get("/orders")
        //     .then(res => {
        //         // console.log(res.data);                
        //         let data = res.data;
        //         const fetchedOrders = [];
        //         for (let key in data) {
        //             console.log(data[key]);
        //             fetchedOrders.push({
        //                 orderInfo: data[key],
        //                 id: key
        //             })
        //         }
        //         console.log(fetchedOrders);
        //         this.setState({ orders: fetchedOrders, isLoading: false });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ isLoading: false, isError: true });
        //     });


        // Redux -  load the orders from the DB using async action creators 
        this.props.onOrdersFetch(this.props.token, this.props.userId);
    }
    render() {
        let orders = this.props.orders // || this.state.orders;
        let ordersJsx = null;

        if (orders) {
            ordersJsx = orders.map(order => {
                return <Order orderInfo={order.orderInfo} key={order.id} />;
            })
        } else if (this.props.isLoading) { // || this.state.isLoading) {
            ordersJsx = <Spinner />;
        }
        else if (this.props.isError) { // || this.state.isError) {
            ordersJsx = <h1>Data Not Found</h1>;
        }

        return (
            <div>
                {ordersJsx}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.cnct.orders,
        isLoading: state.cnct.isLoading,
        isError: state.cnct.isError,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetch: (token, userId) => { dispatch(actions.fetchOrders(token, userId)) }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));