import React, {useState} from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../userPhoto.jpg";
import classes from "./ProfileInfo.module.css"
import ProfileDataForm from "./ProfileDataForm";
import Preloader from "../../common/preloader/preloader";


const ProfileInfo = ({
                         profile, status, updateStatus,
                         isOwner, savePhoto, saveProfile, isLoadingPhoto
                     }) => {
    let [editMode, setEditMod] = useState(false);
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };

    const onSubmit = (formData) => {
        saveProfile(formData, isOwner).then(response => {
            if (!response) return setEditMod(false)
        });
    };

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <div className={classes.mainPhoto}>
                    {!isLoadingPhoto ?
                        <img className={classes.photo}
                             src={(profile.photos && (profile.photos.large_img
                                 || profile.photos.large)) || userPhoto}/> :
                        <Preloader/>
                    }
                </div>
                <div>{isOwner && <input type={"file"}
                                        onChange={onMainPhotoSelected}/>}</div>
                {editMode ? <ProfileDataForm initialValues={profile}
                                             profile={profile}
                                             onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner}
                                 goToEditMode={() => setEditMod(true)}/>}
                <ProfileStatusWithHooks status={status}
                                        updateStatus={updateStatus}
                                        isOwner={isOwner}/>
            </div>
        </div>
    )
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div>
                <b> Full name:</b> {profile.full_name}
            </div>
            <div>
                <b> Looking for a
                    job:</b> {profile.looking_for_a_job ? "yes" : "no"}
            </div>
            {profile.looking_for_a_job &&
            <div>
                <b> My professional
                    skills:</b> {profile.looking_for_a_job_description}
            </div>
            }
            <div>
                <b> Contacts:</b> {profile.contacts && Object.keys(profile.contacts).map(key => (
                <Contact contactTitle={key}
                         contactValue={profile.contacts[key]}/>))}
            </div>
        </div>
    )

};


export const Contact = ({contactTitle, contactValue}) => {
    return <div className={classes.contact}><b>{contactTitle}</b>{contactValue}
    </div>
};

export default ProfileInfo