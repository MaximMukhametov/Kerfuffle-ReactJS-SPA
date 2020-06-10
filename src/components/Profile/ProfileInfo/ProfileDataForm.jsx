import React from "react";
import {fieldCreator, Input, Textarea} from "../../common/FormsControls/FormsControls";
import classes from "./ProfileInfo.module.css"
import {reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";


const ProfileDataForm = ({handleSubmit, error, profile, ...props}) => {

    return (
        <form onSubmit={handleSubmit}>
            <button>Save</button>
              {error && <div className={classes.formCommonError}>
                {error}
            </div>}
            <div>
                <b> Full name:</b> {fieldCreator("full_name", "text", Input, {}, 'Full name')}
            </div>
            <div>
                <b> Looking for a job:</b> {fieldCreator("looking_for_a_job", "checkbox", Input)}
            </div>
            <div>
                <b> My professional skills:</b> {fieldCreator("looking_for_a_job_description", "text", Textarea)}
            </div>
            <div>
                <b> Contacts:</b> {Object.keys(profile.contacts).map(key => (
                <div className={classes.contact}>
                    <b>{key}: {fieldCreator("contacts." + key.toLowerCase(),"text" , Input,{placeholder:key})}</b>
                </div>))}
            </div>
        </form>
    )
};

const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataReduxForm