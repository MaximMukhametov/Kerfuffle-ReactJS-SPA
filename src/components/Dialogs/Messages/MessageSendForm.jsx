import React from "react";
import {reduxForm, reset} from "redux-form";
import {
    fieldCreator,
    Textarea
} from "../../common/FormsControls/FormsControls";
import classes from "./MessageDetail.module.css"
import {maxLengthCreator} from "../../../utils/validators/validators";
import {SendButton} from "../../common/buttons/Buttons";

const maxLength300 = maxLengthCreator(300);

const MessageForm = ({handleSubmit, error, ...props}) => {

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {error && <div className={classes.formCommonError}>
                {error}
            </div>}
            <div className={classes.form_field}>
                {fieldCreator("message", "text", Textarea, {
                    validate: [maxLength300],
                    placeholder: "New message", ...props
                })}
                {!!props.dirty &&
                <div className={classes.form_button}><SendButton/></div>}
            </div>
        </form>
    )
};

const MessageSendForm = reduxForm({
    form: "message-form",
    onSubmitSuccess: (result, dispatch, props) => {
        dispatch(reset('message-form'))
    },
})(MessageForm);
export const MessageEditForm = reduxForm({form: "edit-message-form"})(MessageForm);

export default MessageSendForm