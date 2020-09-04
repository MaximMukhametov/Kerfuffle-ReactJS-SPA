import React, {useState} from "react";
import classes from "./ProfileInfo.module.css"
import StatusReduxForm from "../../common/forms/StatusForm";


// Component for displaying user status
const ProfileStatus = (props) => {
    let [editMod, setEditMod] = useState(false);

    const activateEditMode = () => {
        setEditMod(!editMod);
    };

    const sendStatus = (formData) => {
        props.updateStatus(formData.status);
        activateEditMode()
    };

    return (
        <div>
            {!editMod &&
            <div>
                <span className={classes.status}
                      onClick={props.isOwner && activateEditMode}>
                    {props.status || "status"}</span>
            </div>
            }

            {editMod &&
            <div>
                <StatusReduxForm
                    initialValues={{status: props.status}}
                    onSubmit={sendStatus}/>
            </div>
            }
        </div>
    )
};

export default ProfileStatus