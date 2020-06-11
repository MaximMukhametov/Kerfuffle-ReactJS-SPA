import React from "react";
import {reduxForm} from "redux-form";
import {
    fieldCreator,
    Textarea
} from "../../common/FormsControls/FormsControls";
import classes from "./MessageDetail.module.css"



const MessageForm = ({handleSubmit, error, ...props}) => {

    return (
        <form onSubmit={handleSubmit}>
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

const MessageSendForm = reduxForm({form: "message-form"})(MessageForm);
export const MessageEditForm = reduxForm({form: "edit-message-form"})(MessageForm);

export default MessageSendForm