import React from 'react'
import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p style={{ font: 'inherit', fontSize: '10px', margin: 0, color: 'red' }}>Please enter a valid <strong>{props.elementConfig.label}</strong> !</p>
    }

    switch (props.elementType) {
        case ('input'):
            // console.log('[Input.js] => ', props);
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            // console.log('[Input.js] => ', props)
            const options = props.elementConfig.options.map((option, index) =>
                <option
                    key={option.value}
                    value={option.value}>
                    {option.displayValue}
                </option>);
            inputElement =
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {options}
                </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementConfig.label}</label>
            {inputElement}
            {validationError}
        </div>
    );



}
export default input;
