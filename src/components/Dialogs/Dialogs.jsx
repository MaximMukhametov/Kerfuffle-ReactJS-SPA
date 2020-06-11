import React, {useEffect} from "react";
import classes from './Dialogs.module.css'

import {maxLengthCreator} from "../../utils/validators/validators";
import DialogItem from "./DialogItem/DialogItem";
import Posts from "../Profile/MyPosts/Post/Posts";

const maxLength50 = maxLengthCreator(50);


const Dialogs = (props) => {
    useEffect(() => {
        props.getAllUsersWithDialogsThunk()
    }, []);

    const getUserPhoto = (dialog) => (dialog.messagedata.written_by.id === props.authUserId?
    dialog.messagedata.written_for.photos:dialog.messagedata.written_by.photos)

    let dialog = props.dialogsPreview.map(
        d => <DialogItem userId={d.id}
                         userName={d.name}
                         message={d.messagedata.message}
                         photos={getUserPhoto(d)}
                         writtenBy={d.messagedata.written_by}
                         createdAt={d.messagedata.created_at}
        />);

    return <div>
        {dialog}
    </div>
};

export default Dialogs