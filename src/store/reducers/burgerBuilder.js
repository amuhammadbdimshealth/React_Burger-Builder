import * as actionTypes from '../actions/actionTypes'
// import { updateObject } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1
};

const setInitialPrice = (state, ingredients) => {
    //Arif-code
    const ingKeys = Object.keys(ingredients)
    const totalPrice = ingKeys.reduce((sum, ingKey) =>
        sum + ingredients[ingKey] * INGREDIENT_PRICES[ingKey], state.totalPrice)
    return totalPrice;
}

const reducer = (state = initialState, action) => {
    let ingKey = null;
    // let updatedPrice = null;
    let data = null;

    if (action.payLoad) {
        // console.log(action.payLoad)
        ingKey = action.payLoad.ingKey || ingKey;
        data = action.payLoad.data || data
    }

    const addIngredient = (state, action) => {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [ingKey]: state.ingredients[ingKey] + 1
            },
            building: true,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[ingKey]
        };
    }
    const removeIngredient = (state, action) => {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [ingKey]: state.ingredients[ingKey] - 1
            },
            building: true,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[ingKey]
        };
    }
    const setIngredient = (state, action) => {
        return {
            ...state,
            ingredients: action.ingredients,
            error: false,
            building: false,
            totalPrice: setInitialPrice(initialState, action.ingredients)
        }
    }
    const fetchIngredientsFail = (state, action) => {
        return {
            ...state,
            error: true
        }
    }
    const resetState = (state, action) => {
        return {
            ...state,
            ingredients: action.payLoad.data,
            totalPrice: setInitialPrice(initialState, action.payLoad.data)
        };
    }

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state, action)
        case actionTypes.RESET_STATE: return resetState(state, action)//Arif-code
        default: return state;
    }
}

export default reducer;