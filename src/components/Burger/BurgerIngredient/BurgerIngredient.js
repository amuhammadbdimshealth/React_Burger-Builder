import React, {Component} from 'react'
import classes from '../BurgerIngredient/BurgerIngredient.css'
import PropTypes from 'prop-types'

class BurgerIngredient extends Component {
    //=== Arif-Code === Working Code
    
    // render(){
    //     const type = this.props.type;
    //     let formattedType = type.charAt(0).toUpperCase() + 
    //                         type.split('-')
    //                         .map(w=>w.charAt(0).toUpperCase() + w.slice(1))
    //                         .join('')
    //                         .slice(1);

    //     return (
    //         <div className={classes[formattedType]}>
    //             I am {formattedType}
    //         </div>
    //     );
    // }
    
    
   render(){
        let ingredient = null;
        switch (this.props.type) {
            case ('bread-bottom') :                             
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top') : 
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break; 
            case ('meat') : 
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese') : 
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('salad') : 
                ingredient = <div className={classes.Salad}></div>;
                break;
            case ('bacon') : 
                ingredient = <div className={classes.Bacon}></div>;
                break; 
            default :
                ingredient = null;            
        }
        return ingredient;
    };
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}
   
export default BurgerIngredient;

