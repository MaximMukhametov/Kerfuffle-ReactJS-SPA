import React from "react";
import classes from "./Buttons.module.css"

// Buttons templates for reuse in different areas of the application

export const SendButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.send_button}/>
};

export const EditButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.edit_button}/>
};

export const ExitEditModeButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.exit_edit_mode_button}/>
};


export const DeleteButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.delete_button}/>
};

export const UserSearchButton = ({onClickEvent}) => {
    return <button onClick={onClickEvent}
                   className={classes.user_search_button}/>
};

