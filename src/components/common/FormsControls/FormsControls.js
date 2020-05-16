import React from "react";
import classes from "./FormsControls.module.css"
import {Field} from "redux-form";


// rest оператор {input, meta, ...props} раскукоживает два первых параметра , а все остальные запихивает в пропс
// в <textarea {...input} {...props}/> надо передать как минимуму value чтобы она работала, а value находится в input
export const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}

        </div>
    );
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export const fieldCreator = (name, type, component, props = {}, text = '') => (
    <div>
        <Field type={type} name={name} component={component}
               {...props}/>{text}
    </div>
);
