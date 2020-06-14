import React, {useEffect, useState} from "react";
import classes from './MessageDetail.module.css'
import userPhoto from "../../../userPhoto.jpg";
import MessageSendForm, {MessageEditForm} from "./MessageSendForm";


const MessageDetail = ({
                           key, message, writer, addressee, routing,
                           sendMessage, editMessage, deleteMessage, isMyMessage
                       }) => {

    let [editMode, setEditMode] = useState(false);

    const photo = (writer.photos && (writer.photos.small_img
                || writer.photos.small)) || userPhoto;

    const onSubmit = (messageText) => {
        editMessage(message.id, messageText.message);
        setEditMode(!editMode)
    };

    return <div className={`${classes.message} 
    ${isMyMessage ? classes.isMyMessage : classes.isNotMyMessage}`}>
        <div className={classes.writer}>
            <div>{isMyMessage ? 'me' : writer.name}</div>
            <img src={photo} alt="writer"
                 onClick={() => routing.history.push('/profile/'+ (isMyMessage? '':writer.id))}/>
        </div>

        <div className={classes.message_body}>
            <div onBlur={() => setEditMode(!editMode)}>{editMode ?
                <MessageEditForm onSubmit={onSubmit}/> : message.message}</div>
            <div>{message.data}</div>
            {isMyMessage &&
            <div className={classes.message_control}>
                <span onClick={() => setEditMode(!editMode)}>Edit</span>
                <span onClick={() => deleteMessage(message.id)}>Delete</span>

            </div>}
        </div>
    </div>
};

export default MessageDetail