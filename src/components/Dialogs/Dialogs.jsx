import React from "react";
import classes from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"Message"} placeholder={"Message"} component={Textarea}
                   validate={[required, maxLength50]}/>
            <button>send</button>
        </form>
    );
};

const DialogsReduxForm = reduxForm({
    form: 'dialogs'
})(DialogsForm);

const Dialogs = (props) => {
    const onSubmit = (formData) => {
        props.sendMessageCreator(formData.Message)


    };

    let messagesElements = props.messagesPage.messages.map(m => <Message message={m.message}/>);
    let dialogsElements = props.messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <DialogsReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

export default Dialogs