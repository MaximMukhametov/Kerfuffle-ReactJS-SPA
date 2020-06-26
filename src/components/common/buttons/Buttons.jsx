import React from "react";
import classes from "./Buttons.module.css"

export const SendButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.send_button}></button>
};

export const EditButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.edit_button}></button>
};

export const ExitEditModeButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.exit_edit_mode_button}></button>
};


export const DeleteButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.delete_button}></button>
};

export const UserSearchButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.user_search_button}></button>
};

