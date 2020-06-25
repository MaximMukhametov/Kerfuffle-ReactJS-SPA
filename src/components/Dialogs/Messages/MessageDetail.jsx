import React, {useState} from "react";
import classes from './MessageDetail.module.css'
import userPhoto from "../../../media/userPhoto.jpg";
import {MessageEditForm} from "./MessageSendForm";
import {
    DeleteButton,
    EditButton,
    ExitEditModeButton
} from "../../common/buttons/Buttons";


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
                 onClick={() => routing.history.push('/profile/' + (isMyMessage ? '' : writer.id))}/>
        </div>

        <div className={classes.message_content}>
            {editMode ?
                <div className={classes.message_body_text}>
                    <MessageEditForm initialValues={message}
                                     onSubmit={onSubmit}/>
                    <ExitEditModeButton
                        onClickEvent={() => setEditMode(!editMode)}/></div>
                : <div
                    className={classes.message_body_text}>{message.message}</div>}

            <div className={classes.message_data}>{message.data}</div>
            {isMyMessage &&
            <div className={classes.message_control}>
                <EditButton onClickEvent={() => setEditMode(!editMode)}/>
                <DeleteButton onClickEvent={() => deleteMessage(message.id)}/>
            </div>}
        </div>
    </div>
};

export default MessageDetail