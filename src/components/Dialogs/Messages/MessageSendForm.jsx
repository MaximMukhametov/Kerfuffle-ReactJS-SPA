import React from "react";
import {reduxForm, reset} from "redux-form";
import {
    fieldCreator,
    Textarea
} from "../../common/FormsControls/FormsControls";
import classes from "./MessageDetail.module.css"



const MessageForm = ({handleSubmit, error, ...props}) => {

    return (
        <form onBlur={handleSubmit} onSubmit={handleSubmit}>
              {error && <div className={classes.formCommonError}>
                {error}
            </div>}
            <div>
                {fieldCreator("message", "text", Textarea, {}, 'New message')}
            </div>
            <button>Send</button>
        </form>
    )
};

const MessageSendForm = reduxForm({form: "message-form",
    onSubmitSuccess: (result, dispatch, props) => {
        dispatch(reset('message-form'))
    },
})(MessageForm);
export const MessageEditForm = reduxForm({form: "edit-message-form"})(MessageForm);

export default MessageSendForm