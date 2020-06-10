import React from "react";
import classes from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import userPhoto from "../../../userPhoto.jpg"

const DialogItem = ({userId, userName, message, createdAt, photos, writtenBy}) => {
    return (
        <div>
            <NavLink to={"#"} className={classes.dialogs}>
                <img className={classes.userimg}
                     src={photos.small || photos.small_img || userPhoto}/>
                <div>
                    <div>{userName}</div>
                    <div>{message}</div>
                </div>
                <div>{createdAt}</div>
            </NavLink>
        </div>
    )
};

export default DialogItem;