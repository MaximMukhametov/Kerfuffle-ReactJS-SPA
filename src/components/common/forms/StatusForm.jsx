import {maxLengthCreator} from "../../../utils/validators/validators";
import {fieldCreator, Textarea} from "../FormsControls/FormsControls";

import React from "react";

import classes from "./StatusForm.module.css"
import {reduxForm} from "redux-form";

const maxLength40 = maxLengthCreator(40);

const StatusForm = (props) => {

    return (
        <form className={classes.form} onBlur={props.handleSubmit}>
            {fieldCreator("status", "text", Textarea, {
                validate: [maxLength40],
                placeholder: "status",
                ...props
            })}
        </form>
    )
};

const StatusReduxForm = reduxForm({
    form: "edit-profile",
    autoFocus: true
})(StatusForm);
export default StatusReduxForm

