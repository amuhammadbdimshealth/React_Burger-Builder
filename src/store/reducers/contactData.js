import * as actionTypes from '../actions/actionTypes'


const initialState = {
    orders: [],
    isLoading: false,
    purchased: false,
    isError: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Arif Code
        // case actionTypes.CHANGE_LOADING_STATUS:
        //     return {
        //         ...state,
        //         isLoading: !state.isLoading
        //     }

        // Max Code
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                id: action.orderId,
                orderInfo: { ...action.orderData }, //format changed to align with 
            }
            return {
                ...state,
                isLoading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                isLoading: true,

            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            // we need to update the orders array + isLoading : false
            return {
                ...state,
                orders: action.orders,
                isLoading: false,
                isError: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case actionTypes.RESET_ORDERS_ON_LOGOUT:
            return {
                ...state,
                orders: []
            };
        // case actionTypes.AUTH_LOGOUT:
        //     return {
        //         ...state,
        //         orders: []
        //     };            
        default:
            return state;
    }
}

export default reducer;