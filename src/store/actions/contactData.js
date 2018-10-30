import axios from '../../axios-orders'
import * as actionTypes from '../actions/actionTypes'
// declare action creators fro ContactData Ccontainer only

// Arif Code - code works 
/*
export const toggleIsLoading = () => {
    return {
        type: actionTypes.CHANGE_LOADING_STATUS
    }
} 
export const placeOrder = (order) => {
    return dispatch => {
        // do http task 
        axios.post('/orders.json', order)
            .then(resp => {
                dispatch(toggleIsLoading());
                // make isloading = false
                // dispatch synchronous action                
                // route to the burgerBuilder page 

            })
            .catch(err => {
                // dispatch synchronous action
                dispatch(toggleIsLoading());
                // make isloading = false
            })

    }
}*/

// Max Code
export const purchaseBurgerSuccess = (id, orderData) => {
    /*** I expect to get the id of the newly created order so the order which was created on the backend, on the database on our backend, I expect to get this as an id here because I want to pass it on in the action which I actually create here so that in the reducer,we can use that action to actually add the order to our orders array . I need the order data as well.*/
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        // do sync task - dispatch sync action
        dispatch(purchaseBurgerStart());
        // do http task 
        axios.post('/orders.json?auth=' + token, orderData)
        // axios.post('/orders.json', orderData)
            .then(resp => {
                // console.log(resp.data)
                // dispatch synchronous action
                dispatch(purchaseBurgerSuccess(resp.data.name, orderData));
                // make isloading = false => done inside the reducer 

                // route to the burgerBuilder page  : valid approach : routeHistory passed as param
                /* 
                    routeHistory.push('/'); 
                */

            })
            .catch(err => {
                // console.log(err);
                // dispatch synchronous action
                dispatch(purchaseBurgerFail(err));
                // make isloading = false => done inside the reducer
            })
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        
        dispatch(fetchOrdersStart());
        // const queryParams = '?auth='+token + '&orderBy="userId"&equalTo="' + userId +'"';
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

        axios.get("/orders.json" + queryParams)
            .then(res => {

                // console.log(res.data);

                let data = res.data;
                const fetchedOrders = [];

                for (let key in data) {
                    // console.log(data[key]);
                    fetchedOrders.push({
                        orderInfo: data[key],
                        id: key
                    })
                }
                // console.log(fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));

            })
            .catch(error => {
                // console.log(error);
                // this.setState({ isLoading: false, isError: true });
                dispatch(fetchOrdersFail(error))
            });
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    // 
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

