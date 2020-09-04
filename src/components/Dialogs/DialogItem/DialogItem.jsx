import React from "react";
import classes from './DialogItem.module.css'
import {Link} from "react-router-dom";
import userPhoto from "../../../media/userPhoto.jpg"


// Component for displaying a list of people with whom the user
// had a dialogue, as well as the last message between them.
const DialogItem = ({userId, userName, message, createdAt, photos, writtenBy}) => {
    const maxMessageLengthToShow = 60;

    return (
        <Link to={"/dialogs/" + userId} className={classes.dialogs}>

            <div className={classes.user}>
                <img className={classes.userimg}
                     src={photos.small || photos.small_img || userPhoto}/>
                <p className={classes.user_name}>{userName}</p>
            </div>

            <div className={classes.message_body}>
                <img
                    src={writtenBy.photos.small || writtenBy.photos.small_img
                    || userPhoto}/>
                <div>{message.slice(0, maxMessageLengthToShow)}
                    {message.length > maxMessageLengthToShow && '...'}</div>
            </div>

            <div className={classes.createdAt}>{createdAt}</div>
        </Link>
    )
};

export default DialogItem;