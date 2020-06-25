import React from "react";
import classes from "./Buttons.module.css"

export const SendButton = () => {
    return <button className={classes.send_button}></button>
};

export const EditButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent} className={classes.edit_button}></button>
};

export const ExitEditModeButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent} className={classes.exit_edit_mode_button}></button>
};


export const DeleteButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent} className={classes.delete_button}></button>
};

