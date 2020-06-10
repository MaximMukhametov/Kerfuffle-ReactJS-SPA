import React, {useEffect} from "react";
import classes from './Dialogs.module.css'

import {maxLengthCreator} from "../../utils/validators/validators";
import DialogItem from "./DialogItem/DialogItem";
import Posts from "../Profile/MyPosts/Post/Posts";

const maxLength50 = maxLengthCreator(50);


const Dialogs = (props) => {
    useEffect(() => {
        props.getAllUsersWithDialogsThunk()
    }, [props.dialogsPreview]);

    let dialog = props.dialogsPreview.map(
        p => <DialogItem userId={p.id}
                         userName={p.name}
                         message={p.messagedata.message}
                         photos={p.messagedata.written_by.photos}
                         writtenBy={p.messagedata.written_by}
                         createdAt={p.messagedata.created_at}
        />);

    return <div>
        {dialog}
    </div>
};

export default Dialogs