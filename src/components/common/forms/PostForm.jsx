import {maxLengthCreator} from "../../../utils/validators/validators";
import {fieldCreator, Textarea} from "../FormsControls/FormsControls";

import React from "react";
import {SendButton} from "../buttons/Buttons";
import classes from "./PostForm.module.css"

const maxLength700 = maxLengthCreator(700);

// Post creation form
const MyPostsForm = (props) => {

    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            {fieldCreator("post", "text", Textarea, {
                validate: [maxLength700],
                placeholder: "New Post",
                ...props
            })}
            {props.dirty ? <SendButton/> :
                <div className={classes.form_empty}/>}
        </form>
    )
};

export default MyPostsForm

