import React, {useRef, useState} from "react";
import classes from "./FormsControls.module.css"
import {Field} from "redux-form";
import _ from 'lodash';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


// rest оператор {input, meta, ...props} раскукоживает два первых параметра , а все остальные запихивает в пропс
// в <textarea {...input} {...props}/> надо передать как минимуму value чтобы она работала, а value находится в input
export const FormControl = ({input, meta: {touched, error}, children}) => {

    const hasError = touched && error;
    return (
        <div
            className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}

        </div>
    );
};

export const Textarea = (props) => {

    console.log(props.input);

    let textInput = useRef(null);
    const resetHeight = () => {
        textInput.current.style.height = "36px";
    };

    const auto_grow = () => {
        textInput.current.style.height = "auto";
        textInput.current.style.height = (textInput.current.scrollHeight) + "px";
    };

    if (textInput.current &&
        props.meta.valid &&
        props.meta.pristine &&
        _.get(props, 'notResize')) {
        resetHeight()
    }

    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}>
        <textarea ref={textInput}
                  onSelect={() => auto_grow()}
                  autoFocus={true} {...input} {...restProps}/>
    </FormControl>
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
