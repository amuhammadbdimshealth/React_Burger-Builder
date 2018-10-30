import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import Aux from '../../hoc/Aux/Aux'
import classes from './Burger.css' 
// import { withRouter } from 'react-router-dom'

let burger = ( props ) => {
    // console.log("Burger.js => ",props)
    const ingredients = props.ingredients;
    let isIngredientPresent = false;

    // Arif Code === super important function === converts each ingredient into jsx as per the qty of ingredient
    const ingredientJsx = (key, ingredients, qty=ingredients[key]) => {        
        isIngredientPresent = (!isIngredientPresent && qty>0) ? true :  isIngredientPresent;        
        let jsx = [];
        for(let i=0; i<qty; i++){
            jsx.push(<BurgerIngredient type={key} key={`key ${i}`} />)
        }
        return jsx;
    }
    // this function is NOT REQUIRED any more. But its a working code.
    /*
    const ingredientsJsx = (ingredients) => {
        let finalJsx = [];
        for(let key in ingredients){
            if(ingredients.hasOwnProperty(key)){
                finalJsx = [...finalJsx,...ingredientJsx(key, ingredients)];
            }
        }
        return finalJsx;
    }*/
    // console.log(ingredientsJsx(ingredients));
// debugger
    const transformedIngredients = 
        Object
            .keys(props.ingredients)
            .map(igKey => { return {type: igKey, qty: props.ingredients[igKey]} })
            .map(ing => ingredientJsx(ing.type, ingredients, ing.qty));  
        
    const countTotalIngredients = 
        transformedIngredients.reduce((t, i) => t + i.length, 0);                                                    
    
    // console.log({transformedIngredients,countTotalIngredients});

    return (
        <Aux>            
            <div className={classes.Burger}>  
                <BurgerIngredient type="bread-top"/>
                {/* {ingredientsJsx(ingredients)} */} 
                {/* {isIngredientPresent ? transformedIngredients : <p>Please choose some ingredients</p>} */}
                {countTotalIngredients > 0 ? transformedIngredients : <p>Please choose some ingredients</p>}
                <BurgerIngredient type="bread-bottom"/>                
            </div>
        </Aux>
    );
    
}
// burger = withRouter( burger ) // injects the route properties: location, match, history

export default burger ;