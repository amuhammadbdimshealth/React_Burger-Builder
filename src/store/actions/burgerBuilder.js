// action creators 
import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingKey) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payLoad: { ingKey: ingKey }
    };
}

export const removeIngredient = (ingKey) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payLoad: { ingKey: ingKey }
    };
}

export const resetState = (data) => {
    return {
        type: actionTypes.RESET_STATE,
        payLoad: { data: data }
    };
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {    
    return (dispatch) => {
        axios.get("/ingredients.json")
            .then(response => {
                // console.log(response.data);
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });

    }

} 
