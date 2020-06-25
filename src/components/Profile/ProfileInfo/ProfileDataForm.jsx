import React from "react";
import {
    fieldCreator,
    Input,
    Textarea
} from "../../common/FormsControls/FormsControls";
import classes from "./ProfileInfo.module.css"
import {reduxForm} from "redux-form";
import {
    maxLengthCreator,
    required
} from "../../../utils/validators/validators";


const maxLength30 = maxLengthCreator(30);
const maxLength300 = maxLengthCreator(300);
const ProfileDataForm = ({handleSubmit, error, profile, ...props}) => {

    return (
        <form onSubmit={handleSubmit}>

            {error && <div className={classes.formCommonError}>
                {error}
            </div>}
            <div>
                <b> Full name:</b> {fieldCreator("full_name", "text",
                Input, {
                    validate: [maxLength30],
                    placeholder: "Full name",
                    ...props
                }, 'Full name')}
            </div>
            <div>
                <b> Looking for a
                    job:</b> {fieldCreator("looking_for_a_job",
                "checkbox", Input, {
                    validate: [maxLength300],
                    placeholder: "Looking for a job",
                    ...props
                })}
            </div>
            <div>
                <b> My professional
                    skills:</b> {fieldCreator("looking_for_a_job_description",
                "text", Textarea, {
                    validate: [maxLength300],
                    placeholder: "Full name",
                    ...props
                })}
            </div>
            <div>
                <b> Contacts:</b> {Object.keys(profile.contacts).map(key => (
                <div className={classes.contact}>
                    <b>{key}: {fieldCreator("contacts." + key.toLowerCase(),
                        "text", Input, {
                            validate: [maxLength30],
                            placeholder: key
                        })}</b>
                </div>))}
            </div>
            <button className={classes.save_contscts_button}></button>
        </form>
    )
};

const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataReduxForm